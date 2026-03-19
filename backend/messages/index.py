import json
import os
import psycopg2

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
    'Content-Type': 'application/json'
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """Получение и отправка сообщений чата по каналу."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')

    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        channel_id = params.get('channel_id', 'general')
        sub_channel_id = params.get('sub_channel_id', 'announcements')
        since_id = int(params.get('since_id', 0))

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT m.id, u.name, u.avatar, u.color, u.role, u.role_color,
                   m.text, m.created_at, m.user_id
            FROM messages m
            JOIN users u ON u.id = m.user_id
            WHERE m.channel_id = %s AND m.sub_channel_id = %s AND m.id > %s
            ORDER BY m.created_at ASC
            LIMIT 100
        """, (channel_id, sub_channel_id, since_id))
        rows = cur.fetchall()
        cur.close()
        conn.close()

        msgs = [
            {
                'id': r[0],
                'author': r[1],
                'avatar': r[2],
                'color': r[3],
                'role': r[4],
                'roleColor': r[5],
                'text': r[6],
                'time': r[7].strftime('%d.%m в %H:%M'),
                'userId': r[8]
            }
            for r in rows
        ]
        return {'statusCode': 200, 'headers': HEADERS, 'body': json.dumps({'messages': msgs})}

    if method == 'POST':
        body = json.loads(event.get('body') or '{}')
        channel_id = body.get('channel_id', 'general')
        sub_channel_id = body.get('sub_channel_id', 'announcements')
        text = (body.get('text') or '').strip()
        user_id = int(body.get('user_id', 1))

        if not text:
            return {'statusCode': 400, 'headers': HEADERS, 'body': json.dumps({'error': 'text required'})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO messages (user_id, channel_id, sub_channel_id, text)
            VALUES (%s, %s, %s, %s)
            RETURNING id, created_at
        """, (user_id, channel_id, sub_channel_id, text))
        row = cur.fetchone()
        cur.execute("""
            SELECT name, avatar, color, role, role_color FROM users WHERE id = %s
        """, (user_id,))
        u = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        msg = {
            'id': row[0],
            'author': u[0],
            'avatar': u[1],
            'color': u[2],
            'role': u[3],
            'roleColor': u[4],
            'text': text,
            'time': row[1].strftime('%d.%m в %H:%M'),
            'userId': user_id
        }
        return {'statusCode': 200, 'headers': HEADERS, 'body': json.dumps({'message': msg})}

    return {'statusCode': 405, 'headers': HEADERS, 'body': json.dumps({'error': 'method not allowed'})}

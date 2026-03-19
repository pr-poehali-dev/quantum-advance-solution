import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const messages = [
  {
    id: 1,
    author: "Александр",
    avatar: "А",
    color: "from-[#5865f2] to-[#7c3aed]",
    time: "Сегодня в 09:14",
    text: "Добро пожаловать в пространство! Здесь собрана команда. Приватные каналы доступны только по приглашению.",
    role: "Администратор",
    roleColor: "#faa61a",
  },
  {
    id: 2,
    author: "Наташа",
    avatar: "Н",
    color: "from-pink-500 to-rose-500",
    time: "Сегодня в 10:02",
    text: "Отличная платформа! Наконец можно общаться без лишних глаз 👀",
    role: "Участник",
    roleColor: "#3ba55c",
  },
  {
    id: 3,
    author: "Михаил",
    avatar: "М",
    color: "from-teal-500 to-cyan-500",
    time: "Сегодня в 10:45",
    text: "Получил приглашение в приватный канал — всё работает чётко. Подтверждаю 🔐",
    role: "Модератор",
    roleColor: "#5865f2",
  },
];

interface ChatAreaProps {
  currentSubName: string | undefined;
  currentSubLocked: boolean | undefined;
  inputText: string;
  onInputChange: (val: string) => void;
  onOpenMenu: () => void;
  onInviteClick: () => void;
}

export default function ChatArea({
  currentSubName,
  currentSubLocked,
  inputText,
  onInputChange,
  onOpenMenu,
  onInviteClick,
}: ChatAreaProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Заголовок канала */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
        <Button
          variant="ghost"
          className="lg:hidden text-[#8e9297] hover:bg-[#40444b] p-1 mr-1"
          onClick={onOpenMenu}
        >
          <Icon name="Menu" size={18} />
        </Button>
        {currentSubLocked ? (
          <Icon name="Lock" size={16} className="text-[#8e9297]" />
        ) : (
          <Icon name="Hash" size={16} className="text-[#8e9297]" />
        )}
        <span className="text-white font-semibold text-sm">{currentSubName ?? "общий"}</span>
        {currentSubLocked && (
          <span className="text-[10px] text-[#faa61a] bg-[#faa61a20] px-2 py-0.5 rounded-full border border-[#faa61a40]">
            только по приглашению
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
          <Button
            className="hidden sm:flex bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs px-3 py-1.5 rounded-lg h-auto"
            onClick={onInviteClick}
          >
            <Icon name="UserPlus" size={12} className="mr-1.5" />
            Пригласить
          </Button>
          <Icon name="Bell" size={16} className="text-[#b9bbbe] cursor-pointer hover:text-white" />
          <Icon name="Users" size={16} className="text-[#b9bbbe] cursor-pointer hover:text-white" />
          <Icon name="Search" size={16} className="text-[#b9bbbe] cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Разделитель начала канала */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-[#3f4147]" />
          <span className="text-[#72767d] text-xs flex items-center gap-1.5">
            <Icon name="Hash" size={12} />
            Начало канала #{currentSubName}
          </span>
          <div className="flex-1 h-px bg-[#3f4147]" />
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex gap-3 group hover:bg-[#32353b] rounded px-2 py-1 -mx-2 transition-colors"
          >
            <div
              className={`w-10 h-10 bg-gradient-to-br ${msg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
            >
              <span className="text-white text-sm font-bold">{msg.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-white font-semibold text-sm">{msg.author}</span>
                <span
                  className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                  style={{ color: msg.roleColor, backgroundColor: msg.roleColor + "22" }}
                >
                  {msg.role}
                </span>
                <span className="text-[#72767d] text-xs">{msg.time}</span>
              </div>
              <p className="text-[#dcddde] text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Заглушка защищённого пространства */}
        <div className="mx-auto max-w-md text-center py-8">
          <div className="w-16 h-16 bg-[#2f3136] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#40444b]">
            <Icon name="Shield" size={28} className="text-[#5865f2]" />
          </div>
          <h3 className="text-white font-semibold mb-2">Это защищённое пространство</h3>
          <p className="text-[#b9bbbe] text-sm mb-4">
            Приватные каналы доступны только участникам с приглашением. Вы можете пригласить нужных людей прямо сейчас.
          </p>
          <Button
            className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm px-5 py-2 rounded-lg"
            onClick={onInviteClick}
          >
            <Icon name="UserPlus" size={14} className="mr-2" />
            Пригласить участника
          </Button>
        </div>
      </div>

      {/* Поле ввода */}
      <div className="p-3 flex-shrink-0">
        <div className="bg-[#40444b] rounded-xl px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0 hover:bg-transparent text-[#72767d] hover:text-[#dcddde]"
          >
            <Icon name="Plus" size={18} />
          </Button>
          <input
            className="flex-1 bg-transparent outline-none text-[#dcddde] placeholder-[#72767d] text-sm"
            placeholder={`Написать в #${currentSubName ?? "общий"}...`}
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Icon name="Smile" size={18} className="text-[#72767d] cursor-pointer hover:text-[#dcddde]" />
            <Icon name="Send" size={16} className="text-[#5865f2] cursor-pointer hover:text-[#4752c4]" />
          </div>
        </div>
      </div>
    </div>
  );
}

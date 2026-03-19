import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface MembersPanelProps {
  onInviteClick: () => void;
}

const onlineMembers = [
  { name: "Александр", status: "Администратор", color: "from-[#5865f2] to-[#7c3aed]", dot: "#3ba55c" },
  { name: "Наташа", status: "В сети", color: "from-pink-500 to-rose-500", dot: "#3ba55c" },
  { name: "Михаил", status: "Не беспокоить", color: "from-teal-500 to-cyan-500", dot: "#ed4245" },
];

const offlineMembers = ["Дарья", "Игорь"];

export default function MembersPanel({ onInviteClick }: MembersPanelProps) {
  return (
    <div className="hidden xl:flex w-56 bg-[#2f3136] flex-col flex-shrink-0 p-3">
      <div className="mb-4">
        <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">
          В сети — {onlineMembers.length}
        </h3>
        <div className="space-y-1">
          {onlineMembers.map((u, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#36393f] cursor-pointer">
              <div
                className={`w-8 h-8 bg-gradient-to-br ${u.color} rounded-full flex items-center justify-center relative`}
              >
                <span className="text-white text-xs font-bold">{u.name[0]}</span>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#2f3136] rounded-full"
                  style={{ backgroundColor: u.dot }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-medium truncate">{u.name}</div>
                <div className="text-[#b9bbbe] text-[10px] truncate">{u.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">
          Не в сети — {offlineMembers.length}
        </h3>
        <div className="space-y-1">
          {offlineMembers.map((name, i) => (
            <div key={i} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#36393f] cursor-pointer opacity-50">
              <div className="w-8 h-8 bg-[#40444b] rounded-full flex items-center justify-center relative">
                <span className="text-[#8e9297] text-xs font-bold">{name[0]}</span>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#747f8d] border-2 border-[#2f3136] rounded-full" />
              </div>
              <div className="text-[#72767d] text-xs font-medium truncate">{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Приглашение */}
      <div className="mt-auto">
        <Button
          className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs py-2 rounded-lg"
          onClick={onInviteClick}
        >
          <Icon name="UserPlus" size={13} className="mr-1.5" />
          Пригласить участника
        </Button>
      </div>
    </div>
  );
}

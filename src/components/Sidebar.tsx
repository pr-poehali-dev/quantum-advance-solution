import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const servers = ["Г", "П", "К", "О"];

const channels = [
  {
    id: "general",
    name: "общий",
    locked: false,
    sub: [
      { id: "announcements", name: "объявления", locked: false },
      { id: "off-topic", name: "оффтоп", locked: false },
    ],
  },
  {
    id: "private",
    name: "приватный отдел",
    locked: true,
    sub: [
      { id: "strategy", name: "стратегия", locked: true },
      { id: "finances", name: "финансы", locked: true },
    ],
  },
  {
    id: "team",
    name: "команда",
    locked: true,
    sub: [
      { id: "tasks", name: "задачи", locked: true },
      { id: "reviews", name: "ревью", locked: true },
    ],
  },
  {
    id: "public",
    name: "открытое",
    locked: false,
    sub: [
      { id: "ideas", name: "идеи", locked: false },
      { id: "feedback", name: "обратная связь", locked: false },
    ],
  },
];

export type Channel = typeof channels[0];
export type SubChannel = typeof channels[0]["sub"][0];
export { channels };

interface SidebarProps {
  activeChannel: string;
  activeSubChannel: string;
  expandedChannels: string[];
  mobileMenuOpen: boolean;
  onToggleChannel: (id: string) => void;
  onSubClick: (channel: Channel, sub: SubChannel) => void;
  onInviteClick: () => void;
}

export default function Sidebar({
  activeChannel,
  activeSubChannel,
  expandedChannels,
  mobileMenuOpen,
  onToggleChannel,
  onSubClick,
  onInviteClick,
}: SidebarProps) {
  return (
    <>
      {/* Серверная панель */}
      <div className="hidden lg:flex w-[68px] bg-[#202225] flex-col items-center py-3 gap-2 flex-shrink-0">
        <div className="w-11 h-11 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
          <Icon name="MessageSquare" size={20} className="text-white" />
        </div>
        <div className="w-8 h-px bg-[#36393f] my-1" />
        {servers.map((s, i) => (
          <div
            key={i}
            className="w-11 h-11 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2] text-[#dcddde] text-sm font-bold"
          >
            {s}
          </div>
        ))}
        <div className="w-11 h-11 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all hover:bg-[#3ba55c] flex items-center justify-center cursor-pointer mt-1">
          <Icon name="Plus" size={18} className="text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      {/* Боковая панель каналов */}
      <div
        className={`${
          mobileMenuOpen ? "flex" : "hidden"
        } lg:flex w-60 bg-[#2f3136] flex-col flex-shrink-0 z-20 absolute lg:relative inset-y-0 left-0 top-[56px] lg:top-0`}
      >
        <div className="p-3 border-b border-[#202225] flex items-center justify-between">
          <span className="text-white font-semibold text-sm">Nexus Workspace</span>
          <Icon name="ChevronDown" size={16} className="text-[#b9bbbe]" />
        </div>

        {/* Поиск */}
        <div className="px-2 py-2">
          <div className="flex items-center gap-2 bg-[#202225] rounded px-2 py-1.5">
            <Icon name="Search" size={13} className="text-[#72767d]" />
            <span className="text-[#72767d] text-xs">Найти канал...</span>
          </div>
        </div>

        {/* Каналы */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {channels.map((channel) => (
            <div key={channel.id}>
              <button
                onClick={() => onToggleChannel(channel.id)}
                className="w-full flex items-center gap-1 px-1.5 py-1 text-[#8e9297] hover:text-[#dcddde] rounded text-xs font-semibold uppercase tracking-wide"
              >
                <Icon
                  name={expandedChannels.includes(channel.id) ? "ChevronDown" : "ChevronRight"}
                  size={12}
                />
                <span className="flex-1 text-left">{channel.name}</span>
                {channel.locked && (
                  <Icon name="Lock" size={11} className="text-[#72767d]" />
                )}
              </button>

              {expandedChannels.includes(channel.id) && (
                <div className="ml-1 space-y-0.5">
                  {channel.sub.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => onSubClick(channel, sub)}
                      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded text-sm transition-colors ${
                        activeSubChannel === sub.id && activeChannel === channel.id
                          ? "bg-[#393c43] text-white"
                          : "text-[#72767d] hover:text-[#dcddde] hover:bg-[#34373c]"
                      }`}
                    >
                      {sub.locked ? (
                        <Icon name="Lock" size={13} className="text-[#72767d] flex-shrink-0" />
                      ) : (
                        <Icon name="Hash" size={13} className="flex-shrink-0" />
                      )}
                      <span className="truncate">{sub.name}</span>
                      {sub.locked && (
                        <span className="ml-auto text-[10px] text-[#72767d] bg-[#202225] rounded px-1">
                          приват
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Пользователь */}
        <div className="p-2 bg-[#292b2f] flex items-center gap-2 border-t border-[#202225]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#5865f2] to-[#7c3aed] rounded-full flex items-center justify-center relative">
            <span className="text-white text-xs font-bold">А</span>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#292b2f] rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Александр</div>
            <div className="text-[#3ba55c] text-[10px]">● В сети</div>
          </div>
          <Button variant="ghost" size="sm" className="w-7 h-7 p-0 hover:bg-[#40444b]">
            <Icon name="Settings" size={14} className="text-[#b9bbbe]" />
          </Button>
        </div>
      </div>
    </>
  );
}

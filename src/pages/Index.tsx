import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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

const servers = ["Г", "П", "К", "О"];

export default function Index() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [activeSubChannel, setActiveSubChannel] = useState("announcements");
  const [expandedChannels, setExpandedChannels] = useState<string[]>(["general", "public"]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [inviteLink] = useState("https://nexus.app/invite/Xk9pQ2a");
  const [copied, setCopied] = useState(false);

  const currentChannel = channels.find((c) => c.id === activeChannel);
  const currentSub = currentChannel?.sub.find((s) => s.id === activeSubChannel);

  const toggleChannel = (id: string) => {
    setExpandedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubClick = (channel: typeof channels[0], sub: typeof channels[0]["sub"][0]) => {
    if (sub.locked) {
      setShowAccessModal(true);
      return;
    }
    setActiveChannel(channel.id);
    setActiveSubChannel(sub.id);
    setMobileMenuOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden flex flex-col">
      {/* Навигация */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#5865f2] rounded-xl flex items-center justify-center">
            <Icon name="MessageSquare" size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">Nexus</h1>
            <p className="text-[10px] text-[#b9bbbe]">приватный мессенджер</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:flex bg-[#5865f2] hover:bg-[#4752c4] text-white text-sm px-4 py-2 rounded-lg"
            onClick={() => setShowInviteModal(true)}
          >
            <Icon name="UserPlus" size={14} className="mr-2" />
            Пригласить
          </Button>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
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
                  onClick={() => toggleChannel(channel.id)}
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
                        onClick={() => handleSubClick(channel, sub)}
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

        {/* Основная область чата */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Заголовок канала */}
          <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              className="lg:hidden text-[#8e9297] hover:bg-[#40444b] p-1 mr-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon name="Menu" size={18} />
            </Button>
            {currentSub?.locked ? (
              <Icon name="Lock" size={16} className="text-[#8e9297]" />
            ) : (
              <Icon name="Hash" size={16} className="text-[#8e9297]" />
            )}
            <span className="text-white font-semibold text-sm">{currentSub?.name ?? "общий"}</span>
            {currentSub?.locked && (
              <span className="text-[10px] text-[#faa61a] bg-[#faa61a20] px-2 py-0.5 rounded-full border border-[#faa61a40]">
                только по приглашению
              </span>
            )}
            <div className="ml-auto flex items-center gap-3">
              <Button
                className="hidden sm:flex bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs px-3 py-1.5 rounded-lg h-auto"
                onClick={() => setShowInviteModal(true)}
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
            {/* Системное сообщение */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-[#3f4147]" />
              <span className="text-[#72767d] text-xs flex items-center gap-1.5">
                <Icon name="Hash" size={12} />
                Начало канала #{currentSub?.name}
              </span>
              <div className="flex-1 h-px bg-[#3f4147]" />
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3 group hover:bg-[#32353b] rounded px-2 py-1 -mx-2 transition-colors">
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

            {/* Заглушка для приватного канала */}
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
                onClick={() => setShowInviteModal(true)}
              >
                <Icon name="UserPlus" size={14} className="mr-2" />
                Пригласить участника
              </Button>
            </div>
          </div>

          {/* Поле ввода */}
          <div className="p-3 flex-shrink-0">
            <div className="bg-[#40444b] rounded-xl px-4 py-3 flex items-center gap-3">
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0 hover:bg-transparent text-[#72767d] hover:text-[#dcddde]">
                <Icon name="Plus" size={18} />
              </Button>
              <input
                className="flex-1 bg-transparent outline-none text-[#dcddde] placeholder-[#72767d] text-sm"
                placeholder={`Написать в #${currentSub?.name ?? "общий"}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="flex items-center gap-2">
                <Icon name="Smile" size={18} className="text-[#72767d] cursor-pointer hover:text-[#dcddde]" />
                <Icon name="Send" size={16} className="text-[#5865f2] cursor-pointer hover:text-[#4752c4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Участники (правая панель) */}
        <div className="hidden xl:flex w-56 bg-[#2f3136] flex-col flex-shrink-0 p-3">
          <div className="mb-4">
            <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">В сети — 3</h3>
            <div className="space-y-1">
              {[
                { name: "Александр", status: "Администратор", color: "from-[#5865f2] to-[#7c3aed]", dot: "#3ba55c" },
                { name: "Наташа", status: "В сети", color: "from-pink-500 to-rose-500", dot: "#3ba55c" },
                { name: "Михаил", status: "Не беспокоить", color: "from-teal-500 to-cyan-500", dot: "#ed4245" },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 rounded hover:bg-[#36393f] cursor-pointer">
                  <div className={`w-8 h-8 bg-gradient-to-br ${u.color} rounded-full flex items-center justify-center relative`}>
                    <span className="text-white text-xs font-bold">{u.name[0]}</span>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-[#2f3136] rounded-full" style={{ backgroundColor: u.dot }} />
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
            <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">Не в сети — 2</h3>
            <div className="space-y-1">
              {["Дарья", "Игорь"].map((name, i) => (
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
              onClick={() => setShowInviteModal(true)}
            >
              <Icon name="UserPlus" size={13} className="mr-1.5" />
              Пригласить участника
            </Button>
          </div>
        </div>
      </div>

      {/* Модалка — Пригласить */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowInviteModal(false)}
        >
          <div
            className="bg-[#36393f] rounded-2xl w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#202225]">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-white font-bold text-lg">Пригласить участника</h2>
                <Button variant="ghost" size="sm" className="text-[#b9bbbe] hover:text-white p-1" onClick={() => setShowInviteModal(false)}>
                  <Icon name="X" size={18} />
                </Button>
              </div>
              <p className="text-[#b9bbbe] text-sm">Поделитесь ссылкой — только получивший её сможет войти</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide block mb-2">Ссылка-приглашение</label>
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#202225] rounded-lg px-3 py-2.5 text-[#dcddde] text-sm font-mono truncate border border-[#40444b]">
                    {inviteLink}
                  </div>
                  <Button
                    className={`px-4 rounded-lg text-sm font-medium ${copied ? "bg-[#3ba55c] hover:bg-[#3ba55c]" : "bg-[#5865f2] hover:bg-[#4752c4]"} text-white transition-colors`}
                    onClick={handleCopy}
                  >
                    {copied ? <Icon name="Check" size={16} /> : <Icon name="Copy" size={16} />}
                  </Button>
                </div>
              </div>

              <div className="bg-[#2f3136] rounded-xl p-4 space-y-3">
                <p className="text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide">Настройки доступа</p>
                {[
                  { label: "Срок действия", value: "7 дней", icon: "Clock" },
                  { label: "Макс. использований", value: "Без ограничений", icon: "Users" },
                  { label: "Доступ к приватным", value: "Только #общий", icon: "Lock" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#b9bbbe] text-sm">
                      <Icon name={item.icon} fallback="Info" size={14} />
                      {item.label}
                    </div>
                    <span className="text-white text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>

              <p className="text-[#72767d] text-xs text-center">
                <Icon name="Shield" size={11} className="inline mr-1" />
                Ссылка работает только для приглашённых. Вы можете отозвать её в любой момент.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Модалка — нет доступа */}
      {showAccessModal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAccessModal(false)}
        >
          <div
            className="bg-[#36393f] rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-[#ed424520] rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Lock" size={28} className="text-[#ed4245]" />
            </div>
            <h2 className="text-white font-bold text-lg mb-2">Закрытый канал</h2>
            <p className="text-[#b9bbbe] text-sm mb-6">
              Этот канал доступен только участникам с приглашением. Обратитесь к администратору или дождитесь ссылки.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                className="flex-1 text-[#b9bbbe] hover:text-white hover:bg-[#40444b]"
                onClick={() => setShowAccessModal(false)}
              >
                Закрыть
              </Button>
              <Button
                className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white"
                onClick={() => { setShowAccessModal(false); setShowInviteModal(true); }}
              >
                Запросить доступ
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
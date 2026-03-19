import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface InviteModalProps {
  inviteLink: string;
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}

interface AccessModalProps {
  onClose: () => void;
  onRequestAccess: () => void;
}

export function InviteModal({ inviteLink, copied, onCopy, onClose }: InviteModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#36393f] rounded-2xl w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#202225]">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white font-bold text-lg">Пригласить участника</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#b9bbbe] hover:text-white p-1"
              onClick={onClose}
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
          <p className="text-[#b9bbbe] text-sm">Поделитесь ссылкой — только получивший её сможет войти</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide block mb-2">
              Ссылка-приглашение
            </label>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#202225] rounded-lg px-3 py-2.5 text-[#dcddde] text-sm font-mono truncate border border-[#40444b]">
                {inviteLink}
              </div>
              <Button
                className={`px-4 rounded-lg text-sm font-medium ${
                  copied ? "bg-[#3ba55c] hover:bg-[#3ba55c]" : "bg-[#5865f2] hover:bg-[#4752c4]"
                } text-white transition-colors`}
                onClick={onCopy}
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
  );
}

export function AccessModal({ onClose, onRequestAccess }: AccessModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
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
            onClick={onClose}
          >
            Закрыть
          </Button>
          <Button
            className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white"
            onClick={onRequestAccess}
          >
            Запросить доступ
          </Button>
        </div>
      </div>
    </div>
  );
}

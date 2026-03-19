import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Sidebar, { channels, type Channel, type SubChannel } from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import MembersPanel from "@/components/MembersPanel";
import { InviteModal, AccessModal } from "@/components/Modals";

export default function Index() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [activeSubChannel, setActiveSubChannel] = useState("announcements");
  const [expandedChannels, setExpandedChannels] = useState<string[]>(["general", "public"]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [inviteLink] = useState("https://nexus.app/invite/Xk9pQ2a");
  const [copied, setCopied] = useState(false);

  const currentChannel = channels.find((c) => c.id === activeChannel);
  const currentSub = currentChannel?.sub.find((s) => s.id === activeSubChannel);

  const toggleChannel = (id: string) => {
    setExpandedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubClick = (channel: Channel, sub: SubChannel) => {
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
        <Sidebar
          activeChannel={activeChannel}
          activeSubChannel={activeSubChannel}
          expandedChannels={expandedChannels}
          mobileMenuOpen={mobileMenuOpen}
          onToggleChannel={toggleChannel}
          onSubClick={handleSubClick}
          onInviteClick={() => setShowInviteModal(true)}
        />

        <ChatArea
          channelId={activeChannel}
          subChannelId={activeSubChannel}
          currentSubName={currentSub?.name}
          currentSubLocked={currentSub?.locked}
          onOpenMenu={() => setMobileMenuOpen(true)}
          onInviteClick={() => setShowInviteModal(true)}
        />

        <MembersPanel onInviteClick={() => setShowInviteModal(true)} />
      </div>

      {showInviteModal && (
        <InviteModal
          inviteLink={inviteLink}
          copied={copied}
          onCopy={handleCopy}
          onClose={() => setShowInviteModal(false)}
        />
      )}

      {showAccessModal && (
        <AccessModal
          onClose={() => setShowAccessModal(false)}
          onRequestAccess={() => {
            setShowAccessModal(false);
            setShowInviteModal(true);
          }}
        />
      )}
    </div>
  );
}
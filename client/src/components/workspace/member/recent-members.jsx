import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetWorkspaceMembers from "@/hooks/api/use-get-workspace-members";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { Loader } from "lucide-react";

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();
  const { data, isPending } = useGetWorkspaceMembers(workspaceId);

  const members = data?.members || [];

  if (isPending) {
    return (
      <div className="flex justify-center py-6">
        <Loader className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-sm font-medium text-muted-foreground text-center py-5">
        No members found
      </div>
    );
  }

  return (
    <ul role="list" className="flex flex-col gap-3 pt-2">
      {members.map((member, index) => {
        const name = member?.userId?.name || "";
        const initials = getAvatarFallbackText(name);
        const avatarColor = getAvatarColor(name);

        return (
          <li
            key={index}
            role="listitem"
            className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {/* Avatar */}
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={member.userId.profilePicture || ""}
                alt={name}
              />
              <AvatarFallback className={avatarColor}>
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Member Info */}
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900">
                {member.userId.name}
              </p>
              <p className="text-sm text-gray-500">{member.role.name}</p>
            </div>

            {/* Joined Date */}
            <div className="ml-auto text-right text-sm text-gray-500">
              <p>Joined</p>
              <p>{member.joinedAt ? format(member.joinedAt, "PPP") : "-"}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default RecentMembers;

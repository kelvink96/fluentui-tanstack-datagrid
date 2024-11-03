import {Avatar, AvatarSize, Text} from "@fluentui/react-components";
import {Flex} from "./Flex";

type Props = {
  name: string;
  email?: string;
  size?: AvatarSize;
};

export const UserAvatar = (props: Props): React.ReactElement => {
  const { name, size } = props;

  return (
    <Flex align="center">
      <Avatar color="colorful" name={name} size={size ?? 24} />
      <Text size={300}>{name}</Text>
    </Flex>
  );
};

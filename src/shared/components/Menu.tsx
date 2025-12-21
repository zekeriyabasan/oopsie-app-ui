import { Separator, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <Stack>
      <Text>
        <Link to="/oopsie-group">Listem</Link>
      </Text>
      <Separator />
      <Text>
        {" "}
        <Link to="/user-relation">Kullanıcılarım</Link>
      </Text>
      <Separator />
      <Text>Sohbetler</Text>
    </Stack>
  );
};

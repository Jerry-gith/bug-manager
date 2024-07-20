import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingBugDetails = async () => {
  return (
    <Box className="space-y-4 max-w-xl">
      <Skeleton/>
      <Flex gap="3" my="3" className="items-center">
        <Skeleton width={"5rem"} />
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingBugDetails;

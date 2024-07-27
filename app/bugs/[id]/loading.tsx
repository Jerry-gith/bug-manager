import Skeleton from "@/components/Skeleton";
import { AlertDialog, Box, Card, Flex, Grid } from "@radix-ui/themes";

const LoadingBugDetails = async () => {
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <Skeleton width={""} />

        <Flex gap="3" my="3" className="items-center">
          <Skeleton width={"5rem"} />
          <Skeleton width={"8rem"} />
        </Flex>

        <Card className="prose">
          <Skeleton count={3} />
        </Card>
      </Box>

      <Box className="mt-2 md:mt-0">
        <Flex direction="column" gap="3">
          <Skeleton width={"8rem"} />

          <Skeleton width={"8rem"} />

          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Skeleton width={"8rem"} />
            </AlertDialog.Trigger>
          </AlertDialog.Root>
        </Flex>
      </Box>
    </Grid>
  );
};

export default LoadingBugDetails;

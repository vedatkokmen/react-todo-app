import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function Todo({ todo, deleteTodo, markCompleted }) {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"red.100"}
      p={2}
      _hover={{
        cursor: "pointer",
      }}
      borderRadius={6}
      my={4}
      onClick={() => markCompleted(todo._id, todo.completed)}
    >
      <Text fontSize={"lg"} as={todo.completed ? "s" : ""}>
        {todo.title}
        {todo.description}
      </Text>

      <Box>
        <IconButton
          icon={<DeleteIcon />}
          onClick={() => deleteTodo(todo._id)}
        />
      </Box>
    </Flex>
  );
}

export default Todo;

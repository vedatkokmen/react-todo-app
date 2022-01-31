import { Flex, Input, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";

function Add({ addNewTodo }) {
  const [newTodo, setNewTodo] = useState("");
  return (
    <Flex gap={4} p={2} borderRadius={6}>
      <Input
        type="text"
        name="title"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <IconButton
        aria-label="Search database"
        icon={<AddIcon />}
        onClick={(e) => {
          e.preventDefault();
          addNewTodo(newTodo);
          setNewTodo("");
        }}
      />
    </Flex>
  );
}

export default Add;

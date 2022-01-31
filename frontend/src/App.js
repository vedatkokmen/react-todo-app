import {
  Container,
  Heading,
  Box,
  Center,
  Spinner,
  Stack,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";

import { useEffect, useState } from "react";
import api from "./api/api";
import Todo from "./components/Todo";
import Add from "./components/Add";

function App() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [hideCompleted, setHideCompleted] = useState(false);
  const [activeTodos, setActiveTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/${id}`);
      await fetchTodos();
      toast({
        title: `Todo deleted`,
        status: "info",
        isClosable: true,
        duration: 1000,
      });
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const markCompleted = async (id, completed) => {
    try {
      await api.put(`/${id}`, {
        completed: !completed,
      });
      await fetchTodos();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addNewTodo = async (newTodo) => {
    try {
      if (newTodo.length >= 3) {
        await api.post(`/`, {
          title: newTodo,
        });
        await fetchTodos();
        toast({
          title: `Todo added`,
          status: "success",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (error) {
      toast({
        title: `${error.message}`,
        status: "error",
        isClosable: true,
        duration: 1000,
      });
    }
  };

  const filterTodos = () => {
    let filtered = todos.filter((todo) => {
      return todo.completed === false;
    });
    setActiveTodos(filtered);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Center h={"100vh"} bg={"gray.50"}>
      <Container
        py={10}
        bg={"white"}
        borderRadius={6}
        boxShadow={
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
        }
      >
        <Flex alignItems={"center"} justifyContent={"space-between"} p={2}>
          <Box>
            <Heading as="h1" size="xl">
              Todos
            </Heading>
          </Box>
          <Box>
            <Button
              size={"sm"}
              leftIcon={<ViewIcon />}
              onClick={() => {
                setHideCompleted(!hideCompleted);
                filterTodos();
              }}
            >
              {hideCompleted ? "Show All" : "Hide Completed"}
            </Button>
          </Box>
        </Flex>

        <Stack gap={4}>
          <Add addNewTodo={addNewTodo} />
          {loading && (
            <Container centerContent>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Container>
          )}
          <Box>
            {hideCompleted
              ? activeTodos.map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
                      todo={todo}
                      deleteTodo={deleteTodo}
                      markCompleted={markCompleted}
                    />
                  );
                })
              : todos.map((todo) => {
                  return (
                    <Todo
                      key={todo._id}
                      todo={todo}
                      deleteTodo={deleteTodo}
                      markCompleted={markCompleted}
                    />
                  );
                })}
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}

export default App;

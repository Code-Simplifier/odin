import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'

import {
  Box,
  Button,
  ChakraProvider,
  Icon,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
  Divider,
  useToast,
  Select,
  Image
} from '@chakra-ui/react'

import { RxHamburgerMenu } from 'react-icons/rx'
import { IoChatbubble } from "react-icons/io5"
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai"
import { MdOutlineContentCopy } from "react-icons/md"

import { Lato, Rubik } from '@next/font/google'
import Login from './Login'


const lato_semibold = Lato({ weight: '700', subsets: ['latin'] })
const rubik_bold = Lato({ subsets: ['latin'], weight: "900" })
const rubik = Lato({ subsets: ['latin'], weight: "400" })
const chat = Rubik({ subsets: ['latin'], weight: "400" })


export default function Home() {
  const [show, setShow] = useState(true)
  const [model, setModel] = useState("text-davinci-003")
  const [temp, setTemp] = useState()
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([
    {
      user: "me",
      message: "These are dummy messages only for examples."
    },
    {
      user: "ai",
      message: "Kindly click on the New Chat button in the sidebar to use Odin"
    },
  ])


  const clearChat = () => { setChatLog([]) }

  function Sidebar() {
    return (
      <VStack borderRadius={16} margin={3} minH="98vh" bgColor="#001623" width={310}>
        {/* new chat */}
        <Button
          color="teal.200"
          borderColor="teal.300"
          variant="outline"
          size="lg"
          width="90%"
          margin={10}
          marginLeft={10}
          marginRight={10}
          boxShadow="0 0 10px #45f3ff"
          _hover={{ boxShadow: "0 0 20px #45f3ff" }}
          onClick={clearChat}
        >
          <Icon as={AiOutlinePlus} boxSize={6} color="teal.200" marginRight={5} />
          <Text fontFamily={lato_semibold.style.fontFamily} textTransform="uppercase">New Chat</Text>
        </Button>

        <Box>
          <Text fontFamily={rubik_bold.style.fontFamily} fontSize={22}>Model</Text>
        </Box>
        <Divider width="90%" marginBottom={10} borderColor="white" />
        {/* model */}
        <Select 
          defaultValue={"text-davinci-003"}
          color="teal.200"
          borderColor="teal.300"
          width="90%"
          textAlign="center"
          boxShadow="0 0 10px #45f3ff"
          _hover={{ boxShadow: "0 0 20px #45f3ff" }}
          fontFamily={lato_semibold.style.fontFamily}
          textTransform="uppercase"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value='text-davinci-003' id='0.5'>Davinci</option>
          <option value='code-cushman-001' id='0'>Cushman</option>
          <option value='text-ada-001' id='1'>Ada</option>
        </Select>
        <br />
        <Button
          color="teal.200"
          variant="solid"
          size="lg"
          width="90%"
        >
          <Box display="flex" flexDirection="row" flex={1} justifyContent="space-between" >
            <Text fontFamily={rubik_bold.style.fontFamily} color="teal.100">CODE</Text>
            <Text fontFamily={rubik.style.fontFamily} textAlign="center">{model}</Text>
          </Box>
        </Button>
        <br />

        {/* temperature */}
        <Box>
          <Text fontFamily={rubik_bold.style.fontFamily} fontSize={22}>Mode</Text>
        </Box>
        <Divider width="90%" marginBottom={10} borderColor="white" />
        <Button
          color="teal.200"
          borderColor="teal.300"
          variant="outline"
          size="lg"
          width="90%"
          textAlign="center"
          boxShadow="0 0 10px #45f3ff"
          _hover={{ boxShadow: "0 0 20px #45f3ff" }}
        >
          <Text fontFamily={lato_semibold.style.fontFamily} textTransform="uppercase">
            {temp}
          </Text>
        </Button>
        <br />
        <Button
          color="teal.200"
          variant="solid"
          size="lg"
          width="90%"
        >
          <Box display="flex" flexDirection="row" flex={1} justifyContent="space-between" >
            <Text fontFamily={rubik_bold.style.fontFamily} color="teal.100">LOGICAL</Text>
            <Text fontFamily={rubik.style.fontFamily}>0</Text>
          </Box>
        </Button>
        <Button
          color="teal.200"
          variant="solid"
          size="lg"
          width="90%"
        >
          <Box display="flex" flexDirection="row" flex={1} justifyContent="space-between" >
            <Text fontFamily={rubik_bold.style.fontFamily} color="teal.100">BALANCED</Text>
            <Text fontFamily={rubik.style.fontFamily}>0.5</Text>
          </Box>
        </Button>
        <Button
          color="teal.200"
          variant="solid"
          size="lg"
          width="90%"
        >
          <Box display="flex" flexDirection="row" flex={1} justifyContent="space-between" >
            <Text fontFamily={rubik_bold.style.fontFamily} color="teal.100">CREATIVE</Text>
            <Text fontFamily={rubik.style.fontFamily}>1</Text>
          </Box>
        </Button>
      </VStack>
    )
  }
  

  async function handleSubmit(e) {
    e.preventDefault()
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]
    setInput("")
    setChatLog(chatLogNew)

    const messages = chatLogNew.map((message) => message.message).join("\n")

    const response = await fetch("https://cs-odin-server.vercel.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        model
      })
    })


    const data = await response.json()
    setChatLog([...chatLogNew, { user: "ai", message: `${data.message}` }])
    setTemp(data.temp)
    console.log(temp, "temp")

  }

  return (
    <>
      <Head>
        <title>Odin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images.png" />
      </Head>
      <ChakraProvider>
          <div className={styles.main}>
            {show && <Sidebar />}
            <section className={styles.chatbox}>
              <Box>
                <Button alignSelf="flex-start" variant="ghost" onClick={() => setShow(!show)}>
                  <Icon as={RxHamburgerMenu} color="teal.200" boxSize={6} />
                </Button>
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </Box>
              <Box>
                <form onSubmit={handleSubmit}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={IoChatbubble} color="teal.100" boxSize={5} />
                    </InputLeftElement>
                    <Input
                      placeholder='Ask Odin'
                      variant="outline"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      color="white"
                      borderColor="teal.200"
                      letterSpacing={1.2}
                      boxShadow="0 0 10px #45f3ff"
                      _hover={{ boxShadow: "0 0 20px #45f3ff" }}
                      _focus={{ boxShadow: "0 0 20px #45f3ff", borderColor: "teal.200" }}
                      fontFamily={chat.style.fontFamily}
                    />
                    <InputRightElement onClick={handleSubmit} _hover={{ cursor: "pointer" }} pointerEvents="none">
                      <Icon as={AiOutlineArrowRight} color="teal.100" boxSize={5} />
                    </InputRightElement>
                  </InputGroup>
                </form>
              </Box>
            </section>
          </div>
      </ChakraProvider>
    </>
  )
}

const ChatMessage = ({ message }) => {
  const toast = useToast()
  return (
    <Box margin={3}>
      {message.user === "me" ? (
        <Box className={styles.userMsg}>
          <Text fontFamily={chat.style.fontFamily}>{message.message}</Text>
        </Box>
      ) : (
        <Box className={styles.aiMsg}>
          <Text id='aiMsg' fontFamily={chat.style.fontFamily}>{message.message}</Text>
          <Icon
            as={MdOutlineContentCopy}
            onClick={() => {
              navigator.clipboard.writeText(`${message.message}`)
              toast({
                title: "Success!",
                description: "AI response was successfully copied to your clipboard!",
                duration: 3000,
                status: "success",
                isClosable: true
              })
            }}
            boxSize={6}
            color="white"
            marginLeft={5}
            transition="0.5s"
            _hover={{ color: "#45f3ff", textShadow: "0 0 10px #45f3ff", transition: "0.3s", boxSize: 7, cursor: "pointer" }}
          />
        </Box>
      )}
    </Box>
  )
}


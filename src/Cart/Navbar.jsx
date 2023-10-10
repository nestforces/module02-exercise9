

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Badge,
  Divider,
  Image,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { ImCart } from 'react-icons/im'
import {products} from './Product/Product' 
import { Link } from 'react-router-dom'
import axios from 'axios';
import {useState, useEffect} from 'react'




interface Props {
  children: React.ReactNode
}

const Links = ['Gadget', 'Furniture', 'Alat Rumah Tangga']

const NavLink = (props: Props) => {
  const { children } = props
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('green.200', 'green.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure()

    const [data, setData] = useState([]);
    const [cartData, setCartData] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])

    const fetchData = async() => {
      try {
       const response = await axios.get(
         "http://localhost:3000/products"
         );
        setData(response.data);
         console.log(response)
      } catch (err) {
        console.log(err)
      }
    };


    useEffect(() => {
      fetchData();
    }, []);

    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        const cartIds = response.data.map((item) => item.id);
        setCartData(cartIds)
        console.log(cartIds);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      fetchCartData();
    }, []);

    useEffect(() => {
      const newFilteredProducts = data.filter((product) => cartData.includes(product.id));
      setFilteredProducts(newFilteredProducts);
    }, [data, cartData]);

  return (
    <>
      <Box bg={useColorModeValue('green.400', 'green.900')} px={4} textColor='white'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
          color='white'
          backgroundColor='green.400'
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            
            <Menu >
            {filteredProducts.length > 0 && (
                  <Badge variant='solid' border='solid 2px white' borderRadius='100%' paddingBottom='0.5px'  colorScheme='red' transform= 'translate(140%, -45%)' zIndex='10' fontSize='0.6em'>{filteredProducts.length}</Badge>
                  )}
              <MenuButton
               marginRight={{md: '100px', sm: '20px'}}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                >
                  
                <ImCart color='white'></ImCart>
                
              </MenuButton>
              <MenuList width='fit-content' >

              <Box padding='0px 10px 10px 10px' display='flex' flexDirection='row' justifyContent={"space-between"}><Text color='black'> Keranjang ({filteredProducts.length})</Text><Link to = "/keranjang"><Text color='green' fontWeight='bold'>Lihat Sekarang</Text></Link></Box>
              <hr/>{
              filteredProducts.map((item) => (

              
                <MenuItem height='90px' marginTop='10px'>
                  <Box display='flex' flexDirection='row' gap='20px' >
                    <Image margin='auto' height='auto' width='70px' alt='products' src={require(`${item.image}`)} />
                    <Box display='flex' flexDirection='column' >
                      <Text fontWeight='bold' 
                      size='10px'
                      whiteSpace= 'nowrap'
                      width= '130px' 
                      overflow= 'hidden'
                      textOverflow= 'ellipsis'
                      transform= 'translate(0, 20%)'
                      color='black'>{item.name}</Text>
                      <Text color='black'>{item.quantity} Barang ({item.weight})</Text>
                    </Box>
                    <Text color='#f73505' transform= 'translate(0, 35%)' >Rp. {item.price}</Text>
                  </Box>
                </MenuItem>
              ))}
              
              </MenuList>
            </Menu>
            {/* <Button
            marginLeft='10px'
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Beli
            </Button> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={0} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  )
}


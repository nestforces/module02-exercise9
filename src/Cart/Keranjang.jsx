import React from 'react'
import { Box, Checkbox, Divider, Flex, Heading, Text, Image, Button, IconButton } from '@chakra-ui/react'
import { CiDiscount1 } from 'react-icons/ci'
import { RiArrowRightSLine, RiShieldCheckFill, RiDeleteBin6Fill } from 'react-icons/ri'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import axios from 'axios';
import {useState, useEffect} from 'react'
import {products} from './Product/Product' 


function Keranjang() {

    const [data, setData] = useState([]);

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

    // const [quantity, setQuantity] = useState(1)

    // const decrement = () => {
    //     set
    // }
  return (
    <Box>
        <Flex
        flexDirection={"row"}
        flexWrap={"wrap"}
        margin={"10%"}
        >
            <Flex
            flexDirection={"column"}
            width={"70%"}
            paddingRight={'3%'}
            >
                <Heading textAlign={"left"}>Keranjang</Heading>
                <Flex 
                justifyContent='space-between'
                marginBottom={'3%'}>
                    <Checkbox size='md' colorScheme='green'>
                        pilih semua
                    </Checkbox>
                    <Text as='b' color='red' textAlign='right'> Hapus </Text>
                </Flex>

                <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300'/>    
                
                {data.length > 0 &&
              data.map((item)=>(
                <Box>
                <Flex 
                marginTop='3%'
                >
                    <Checkbox 
                    size='md' 
                    colorScheme='green' 
                    marginRight='5px'
                    marginTop='-20px'
                    ></Checkbox>
                    <Flex flexDirection={'column'}>
                        <Flex alignItems='center'>
                            <RiShieldCheckFill color='purple'/>
                            <Text as='b' marginLeft={'4px'}>{item.shop}</Text>
                        </Flex>
                        <Text textAlign={'left'} color={'blackAlpha.600'}>{item.region}</Text>
                    </Flex>
                </Flex>

                <Flex marginTop='5px'>
                    <Checkbox 
                    size='md' 
                    colorScheme='green' 
                    marginRight='5px'
                    
                    ></Checkbox>
                    <Box width='80px' height='80px'>
                        <Image src={require(`${item.image}`)} alt='sendal' width='90%' marginLeft='5px'/>
                    </Box>
                    <Flex flexDirection={'column'} marginLeft='5px'>
                        <Text textAlign={'left'}>{item.name}</Text>
                        <Text as='b' textAlign={'left'}>Rp. {item.price}</Text>
                    </Flex>
                </Flex>

                <Flex marginLeft='25px' justifyContent={'space-between'}>
                    <Text color={'green.400'}>Tulis Catatan</Text>
                    <Flex alignItems='center'>
                        <Text color='blackAlpha.400'>Pindahkan ke Wishlist</Text>
                        <Divider orientation='vertical' marginLeft='10px' marginRight='10px'/>
                        <Box>
                            <IconButton colorScheme='transparent' icon={<RiDeleteBin6Fill color='gray'/>}/>
                        </Box>
                        <Box marginLeft='10px'>
                            <IconButton colorScheme='transparent' icon={<AiOutlineMinusCircle color='green'/>}/>   
                        </Box>
                        <Text color='blackAlpha.300'>{item.quantity}</Text>
                        <Box>
                        <IconButton colorScheme='transparent' icon={<AiOutlinePlusCircle color='green'/>}/>
                        </Box>                        
                    </Flex>
                </Flex>
                <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300' marginTop='20px'/>    

                </Box>
                ))}
            </Flex>

           

            <Flex
            flexDirection={"column"}
            width={"30%"}
            // border='0.7px'
            borderColor='gray'
            borderRadius='lg'
            padding='0%'
            boxShadow={'base'}
            >
                <Flex  
                border='solid 1px gray' 
                borderRadius='0.5rem' 
                justifyContent='center' 
                alignItems='center'
                marginBottom='5%'
                margin='5%'>
                    <Box margin='5px'>
                        <CiDiscount1 size='25px' color='green'/>
                    </Box>
                    <Box>
                        <Text as='b' fontSize='14px' marginEnd='0.5rem' color='gray'>
                            Makin hemat pakai promo
                        </Text>
                    </Box>
                    <Box margin='5px'>
                        <RiArrowRightSLine size='25px' color='gray'/>
                    </Box>
                </Flex>
                
                <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300'/>

                <Flex 
                flexDirection='column'
                margin='5%'>
                    <Text as='b' color='blackAlpha.700' textAlign='left'>Ringkasan Belanja</Text>
                    <Flex justifyContent='space-between'>
                        <Text color='blackAlpha.600' textAlign='left'>Total harga (1 barang)</Text>
                        <Text color='blackAlpha.600'>Rp. 219.000</Text>
                    </Flex>
                </Flex>
                
                <Flex 
                flexDirection='column'
                margin = '5%' >
                    <Divider orientation='horizontal' borderBottom='1px' borderColor='blackAlpha.300'/>
                    <Flex flexDirection={'row'} justifyContent={'space-between'} marginTop='5%'>
                        <Text as='b' color='blackAlpha.700'>Total Harga</Text>
                        <Text as='b' color='blackAlpha.700'>Rp. 219.000</Text>
                    </Flex>
                    <Flex>
                        <Button width={'100%'} colorScheme='green' marginTop={'5%'}>Beli</Button>
                    </Flex>
                    
                </Flex>
                
            </Flex>

        </Flex>
    </Box>
  )
}

export default Keranjang
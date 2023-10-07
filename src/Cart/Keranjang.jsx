import React, { useState, useEffect } from 'react';
import { Box, Checkbox, Divider, Flex, Heading, Text, Image, Button, IconButton } from '@chakra-ui/react';
import { CiDiscount1 } from 'react-icons/ci';
import { RiArrowRightSLine, RiShieldCheckFill, RiDeleteBin6Fill } from 'react-icons/ri';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import axios from 'axios';

function Keranjang() {
  const [quantities, setQuantities] = useState({});
  const [itemCounts, setItemCounts] = useState({});
  const [data, setData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);



  const handleProductCheckboxChange = (productId) => {
    // Toggle the selected status of the item with the given productId
    setItemCounts((prevItemCounts) => ({
      ...prevItemCounts,
      [productId]: !prevItemCounts[productId],
    }));

    // Calculate the total quantity based on the selected items
    const newTotalQuantity = Object.values(itemCounts).reduce(
      (total, isSelected) => total + (isSelected ? 1 : 0),1
    );

    setTotalQuantity(newTotalQuantity);
  };

  const increment = (index) => {
    // Check if the item count exists in itemCounts
    if (itemCounts[index] !== undefined) {
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [index]: prevItemCounts[index] + 1,
      }));
      setTotalQuantity(totalQuantity + 1);
    } else {
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [index]: 1,
      }));
    }
  };
  
  const decrement = (index) => {
    if (itemCounts[index] > 0) {
      setItemCounts((prevItemCounts) => ({
        ...prevItemCounts,
        [index]: prevItemCounts[index] - 1,
      }));
      
    }
  };
  

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${productId}`);

      fetchCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      const productsWithParsedPrice = response.data.map((product) => ({
        ...product,
        price: parseFloat(product.price.replace(/\./g, '').replace(',', '.')),
      }));
      setData(productsWithParsedPrice);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/cart");
      const cartIds = response.data.map((item) => item.id);
      // Now, you have an array of product IDs in the cartIds variable.
      setCartData(cartIds);
      console.log(cartIds);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const filteredProducts = data.filter((product) => cartData.includes(product.id));

  function formatPriceToIDR(price) {
    // Use Intl.NumberFormat to format the number as IDR currency
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  }

  const calculateTotalPrice = () => {
    let total = 0;
    filteredProducts.forEach((item, index) => {
      if (itemCounts[index]) {
        total += item.price * itemCounts[index];
      }
    });
    return total;
  };

  return (
    <Box width='95%'>
      <Flex
        flexDirection={{ md: 'row', sm: 'column' }}
        flexWrap={"wrap"}
        justifyContent='center'
        margin={{ md: '10%', sm: '0% -5% 10% 10%' }}
      >
        <Flex
          flexDirection={"column"}
          width={{ md: '70%', sm: '80%' }}
          padding={'3%'}
          id='products'
        >
          <Heading textAlign={"left"} marginBottom='20px'>Keranjang</Heading>
          {/* <Flex justifyContent='space-between' marginBottom={'3%'}>
            <Checkbox
              size='md'
              colorScheme='green'
              onChange={handleSelectAllChange}
              isChecked={selectAll}
            >
              pilih semua
            </Checkbox>
            <Text as='b' color='red' textAlign='right'> Hapus </Text>
          </Flex> */}

          <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300' />
          {filteredProducts.map((item, index) => (
            <Box key={item.id}>
              <Flex marginTop='3%'>
                <Checkbox
                  size='md'
                  colorScheme='green'
                  onChange={() => handleProductCheckboxChange(index)}
                  isChecked={!!itemCounts[index]}
                  marginRight='5px'
                  marginTop='-20px'
                ></Checkbox>
                <Flex flexDirection={'column'}>
                  <Flex alignItems='center'>
                    <RiShieldCheckFill color='purple' />
                    <Text as='b' marginLeft={'4px'}>{item.shop}</Text>
                  </Flex>
                  <Text textAlign={'left'} color={'blackAlpha.600'}>{item.region}</Text>
                </Flex>
              </Flex>

              <Flex marginTop='5px' >
                {/* <Checkbox
                  size='md'
                  colorScheme='green'
                  marginRight='5px'
                ></Checkbox> */}
                <Box width='80px' height='80px' >
                  <Image src={require(`${item.image}`)} alt='sendal' width='90%' marginLeft='5px' />
                </Box>
                <Flex flexDirection={'column'} marginLeft='5px'>
                  <Text textAlign={'left'}>{item.name}</Text>
                  <Text as='b' textAlign={'left'}>{formatPriceToIDR(item.price)}</Text>
                </Flex>
              </Flex>

              <Flex marginLeft='25px' justifyContent={'space-between'}>
                <Text color={'green.400'}>Tulis Catatan</Text>
                <Flex alignItems='center'>
                  <Text color='blackAlpha.400'>Pindahkan ke Wishlist</Text>
                  <Divider orientation='vertical' marginLeft='10px' marginRight='10px' />
                  <Box>
                    <IconButton colorScheme='transparent' icon={<RiDeleteBin6Fill color='gray' />} onClick={() => handleRemoveFromCart(item.id)} />
                  </Box>
                  <Box marginLeft='10px'>
                    <IconButton colorScheme='transparent' icon={<AiOutlineMinusCircle color='green' />} onClick={() => decrement(index)} />
                  </Box>
                  
                  <Text id='quantity' color='black.300'>
                    {itemCounts[index]}
                  </Text>
                  <Box>
                    <IconButton colorScheme='transparent' icon={<AiOutlinePlusCircle color='green' />} onClick={() => increment(index)} />
                  </Box>
                </Flex>
              </Flex>
              <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300' marginTop='20px' />
            </Box>
          ))}
        </Flex>

        <Flex
          id='total'
          flexDirection={"column"}
          width={{ md: '30%', sm: '80%' }}
          marginLeft={{ md: '0%', sm: '0%' }}
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
            margin='5%'
          >
            <Box margin='5px'>
              <CiDiscount1 size='25px' color='green' />
            </Box>
            <Box>
              <Text as='b' fontSize='14px' marginEnd='0.5rem' color='gray'>
                Makin hemat pakai promo
              </Text>
            </Box>
            <Box margin='5px'>
              <RiArrowRightSLine size='25px' color='gray' />
            </Box>
          </Flex>

          <Divider orientation='horizontal' borderBottom='2px' borderTop='2px' borderColor='blackAlpha.300' />

          <Flex
            flexDirection='column'
            margin='5%'
          >
            <Text as='b' color='blackAlpha.700' textAlign='left'>Ringkasan Belanja</Text>
            <Flex justifyContent='space-between'>
              <Text color='blackAlpha.600' textAlign='left' id='totalbarang'>
                Total harga ({totalQuantity} barang)
              </Text>
              <Text color='blackAlpha.600'>{formatPriceToIDR(calculateTotalPrice())}</Text>
            </Flex>
          </Flex>

          <Flex
            flexDirection='column'
            margin='5%'
          >
            <Divider orientation='horizontal' borderBottom='1px' borderColor='blackAlpha.300' />
            <Flex flexDirection={'row'} justifyContent={'space-between'} marginTop='5%'>
              <Text as='b' color='blackAlpha.700'>Total Harga</Text>
              <Text as='b' color='blackAlpha.700'>{formatPriceToIDR(calculateTotalPrice())}</Text>
            </Flex>
            <Flex>
              <Button width={'100%'} colorScheme='green' marginTop={'5%'}>Beli</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Keranjang;

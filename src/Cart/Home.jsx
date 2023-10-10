import { Box, SimpleGrid, Card, CardHeader, Heading, CardBody, CardFooter, Text, Button, Image, Stack, Divider, ButtonGroup } from "@chakra-ui/react";
import axios from 'axios';
import { useState, useEffect } from 'react'
import { replace, useFormik } from 'formik'
import {useNavigate} from 'react-router-dom'

function Home() {
    const [data, setData] = useState([]);
    const [productId, setProductId] = useState(null); // Define productId state
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/products"
            );
            setData(response.data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = async (productId) => {
      try {
          console.log("Adding to cart:", productId);
          await axios.post("http://localhost:3000/cart", {
              id: productId,
          });
          navigate('/')
          alert("Added to cart")
      } catch (err) {
        alert("Already added")
          console.log(err);
      }
  }

  
  

    const formik = useFormik({
        initialValues: {
            productId: null,
        },
        // validationSchema: LoginSchema,
        onSubmit: (values) => {
            setProductId(values.productId); 
            addData(values.productId); 
        },
    });

    return (
        <SimpleGrid minChildWidth='300px' spacing='40px'  marginTop='30px' margin={{sm: '15%', md :'0%'}} marginBottom={{md: '25px'}} >
            {data.length > 0 &&
                data.map((item, index) => (
                  <form onSubmit={formik.handleSubmit}>
                    <Card maxW='sm' border='solid black 1px' marginLeft='5px' marginTop='10px'
                        key={index}>
                        <CardBody>
                            <Image
                                src={require(`${item.image}`)}
                                alt={item.name}
                                borderRadius='lg'
                                height='200px'
                                width='auto'
                                margin='auto'
                            />
                            <Stack mt='6' spacing='3'>
                                <Heading size='md'>{item.name}</Heading>
                                <Text>
                                    Berat {item.weight}
                                </Text>
                                <Text color='#f73505' fontSize='2xl'>
                                    Rp. {item.price}
                                </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button variant='solid' colorScheme='green'>
                                    Beli sekarang
                                </Button>
                                <Button
                                    variant='ghost'
                                    colorScheme='green'
                                    type="submit"
                                    onClick={() => formik.setFieldValue('productId', item.id)}>
                                    Tambahkan ke keranjang
                                </Button>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                    </form>
                ))}
        </SimpleGrid>
    )
}

export default Home;

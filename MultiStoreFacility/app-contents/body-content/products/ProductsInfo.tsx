import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, useColorScheme, StyleSheet, Text } from 'react-native';
import HttpService from '../../common/services/HttpService';
import ApiUrls from '../../navigation/ApiUrls';
import { Pressable } from 'react-native';
import UserService from '../../common/services/UserService';
import { Image } from 'react-native-elements';

function ProductsInfo({ navigation }: any): JSX.Element {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleProductInfo();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const handleProductInfo=()=>{
       
        HttpService.getApi(ApiUrls.AllProducts)
            .then(async (res: any) => {
                
                if(res.success) {
                    for(let i=0; i<res.data.length; i++)
                        await loadProductImage(res.data[i].detail.imagePath, res.data[i]);

                    setProducts(res.data);
                    setLoading(false);
                    
                } else {
                    setProducts([]);
                }
            })
            .catch((error) => {
                setProducts([]);
                console.log('Error: '+error)
            });
    }

    const loadProductImage=(imageDir: any, product: any)=> {

        HttpService.postApi(ApiUrls.productImage, imageDir, { responseType: 'arraybuffer' })
            .then((res: any) => {
                console.log('st: '+res)
                if(res) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        product.imageUrl = reader.result as string;
                        console.log('A: '+product.imageUrl)
                    };
                    reader.readAsDataURL(new Blob([res]));
                    
                } else {
                    let imageName = imageDir.substring(imageDir.indexOf('/')+1);
                    console.log('Failed to load false image: '+imageName);
                }
            })
            .catch((error) => {
                let imageName = imageDir.substring(imageDir.indexOf('/')+1);
                console.error('Failed to load image: '+imageName);
            });
    }

    if (loading) {
        return <Text>Loading products...</Text>;
    }

    if (products.length === 0) {
        return <Text>No products found</Text>;
    }
    return (

        <SafeAreaView>
            <ScrollView>

            <View>

                {products.map((product: any) => (
                    <ProductInfo
                        key={product.id}
                        product={product}
                    />
                ))}
                
            </View>
            
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProductsInfo;

function ProductInfo({ product }:any): JSX.Element {
    return(
        <View style={styles.productContainer}>
            
            {product.imageUrl && (
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                />
            )}
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.desc}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    productContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
    },
});

import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import HttpService from '../../common/services/HttpService';
import ApiUrls from '../../navigation/ApiUrls';
import { Image } from 'react-native-elements';

function ProductsInfo(): JSX.Element {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        handleProductInfo();
    }, []); // Empty dependency array ensures this runs only once on component mount

    const handleProductInfo = () => {

        setLoading(true);

        HttpService.getApi(ApiUrls.AllProducts)
            .then(async (res: any) => {

                if (res.success && res.data.length != 0) {

                    const totalImg = [] as any;

                    for (let i = 0; i < res.data.length; i++) {

                        await loadProductImage(res.data[i].detail.imagePath, res.data[i], totalImg, i, res.data.length);
                    }
                    setProducts(res.data);

                } else {
                    setProducts([]);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setProducts([]);
                setLoading(false);
            });
    }

    const loadProductImage = (imageDir: any, product: any, totalImg: any, currIndex: any, lastIndex: any) => {

        HttpService.postApi(ApiUrls.productImage, imageDir, { responseType: 'blob' })
            .then((res: any) => {

                if (res) {

                    const reader = new FileReader();
                    reader.onload = () => {

                        product.imageUrl = reader.result as string;
                        setImageLoaded(totalImg, currIndex, lastIndex);
                    };
                    reader.onabort = () => {
                        setImageLoaded(totalImg, currIndex, lastIndex);
                    };
                    reader.onerror = () => {
                        setImageLoaded(totalImg, currIndex, lastIndex);
                    };
                    reader.readAsDataURL(res);

                } else {
                    setImageLoaded(totalImg, currIndex, lastIndex);
                    let imageName = imageDir.substring(imageDir.indexOf('/') + 1);
                    console.log('Image not loaded: ' + imageName);
                }
            })
            .catch((error) => {
                setImageLoaded(totalImg, currIndex, lastIndex);
                console.error('Image load error: ' + error);
            });
    }

    const setImageLoaded = (totalImg: any, currIndex: any, lastIndex: any) => {
        totalImg.push(currIndex);
        if (totalImg.length === lastIndex) {
            setLoading(false);
            totalImg = [];
        }
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

                <View style={styles.parentContainer}>

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

function ProductInfo({ product }: any): JSX.Element {
    return (
        <View style={styles.productContainer}>

            {product.imageUrl && (
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.desc}</Text>

                {product.detail.info && product.detail.info.length > 0 && (
                    <View style={styles.infoContainer}>
                        {product.detail.info.map((infoItem: any, index: any) => (
                            <Text key={index} style={styles.infoItem}>
                                {index+1}. {infoItem}
                            </Text>
                        ))}
                    </View>
                )}

            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    parentContainer: {
        height: '100%',
        width: '100%',

    },
    productContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row', // Arrange children horizontally
        //height: 'auto',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 8,
        marginRight: 8, // Add margin between image and text
    },
    textContainer: {
        flex: 1, // Take the remaining horizontal space
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
    infoContainer: {
        marginTop: 8,
    },
    infoItem: {
        fontSize: 14,
        color: '#333',
    },
});

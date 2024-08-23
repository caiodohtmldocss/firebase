import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseConfig';

const realizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const tentarLogar = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setSuccessMessage('Login realizado com sucesso!');
                setErrorMessage('');
                navigation.navigate('PaginaPrincipal');
            })
            .catch(error => {
                setErrorMessage('Credenciais inseridas inválidas! ');
                setSuccessMessage('');
            });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://images.tcdn.com.br/img/img_prod/714060/fundo_fotografico_paisagem_pier_praia_em_tecido_pn_0049_2879_1_6aadd29389080461c76c8fcb449140d1.jpg' }} // Substitua pela URL da imagem que deseja usar
            style={styles.backgroundImage}
        >
            <View style={styles.overlay} /> {/* Opcional: Para adicionar um overlay escuro */}
            <View style={styles.container}>
                <Text style={styles.header}>Login</Text>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
                {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Senha"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={tentarLogar}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opcional: Adiciona uma sobreposição escura
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 24,
        marginBottom: 24,
        fontWeight: 'bold',
        color: '#fff', // Ajuste a cor para ficar visível sobre a imagem de fundo
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    successText: {
        color: 'green',
        marginBottom: 16,
    },
});

export default realizarLogin;

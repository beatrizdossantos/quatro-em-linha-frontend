import * as React from 'react';
import { createContext } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = React.useState(false);
    const [opcao, setOpcao] = React.useState('');
    const [cookieAuth, setCookieAuth] = React.useState(false);

    const ValidaCookie = () => {
        const authToken = Cookies.get('authToken');
        const loginId = Cookies.get('userId');

        if (authToken) {
            setAuth(true);
            setUserId(loginId);
        }
        // else ValidateLogin(); // buscando dados do DB
    };

    const [cadastro, setCadastro] = React.useState({loading: false, cadastro: false});

    const RealizaCadastro = async (nome, email, senha) => {
        setCadastro(prev => {return {loading: true, cadastro: false}});
        console.log('Realizando cadastro')
        try {
            let data = [];
            const response = await axios.post(
                `/api/v1/usuario`,
                {
                    nome: nome,
                    email: email,
                    senha: senha
                },
                {mode: 'no-cors'}
            );
            if (response.status === 201 && response.data.status === true) {
                setOpcao('login');
                setCadastro(prev => {return {loading: false, cadastro: true}});
            }
            
        } catch (error) {
            setCadastro(prev => {return {loading: false, cadastro: false}});
            console.error(error);
        };
    };

    const [login, setLogin] = React.useState({loading: false, login: false});
    const [userId, setUserId] = React.useState(null);

    const RealizaLogin = async (email, senha) => {
        setLogin(prev => {return {loading: true, login: false}});
        console.log('Realizando login..')
        try {
            const response = await axios.post(
                `/api/v1/login`,
                {
                    email: email,
                    senha: senha
                },
                {mode: 'no-cors'}
            );
            if (response.status === 200 && response.data.status === true) {
                setLogin(prev => {return {loading: false, login: true}});
                setUserId(response.data.id);
                console.log(response)
                Cookies.set('authToken', true, { expires: 7 });
                Cookies.set('userId', response.data.id, { expires: 7 });
                ValidaCookie();
            };
            console.log(response)
            
        } catch (error) {
            console.error(error);
        };
    };

    const [carteira, setCarteira] = React.useState('0')

    const ConsultaCarteira = async () => {
        let usuario = Cookies.get('userId');
        try {
            const response = await axios.get(
                `/api/v1/usuario/${usuario}`,
                {mode: 'no-cors'}
            );
            if (response.status === 200 && response.data.status === true) {
                setCarteira(response.data.data.carteira);
            };
            console.log('carteira: ', carteira.toString())
        } catch (error) {
            console.error(error);
        };
    };

    const AlteraCarteira = async (moedas) => {
        let usuario = Cookies.get('userId');
        try {
            const response = await axios.put(
                `/api/v1/usuario/${usuario}`,
                {
                    carteira: moedas
                },
                {mode: 'no-cors'}
            );
            if (response.status === 200 && response.data.status === true)
                ConsultaCarteira();
        } catch (error) {
            console.error(error);
        };
    };

    // TEMAS
    const [todosTemas, setTodosTemas] = React.useState({loading: true, data: []})
    const BuscaTemas = async (email, senha) => {
        let data = [];
        try {
            const response = await axios.get(
                `/api/v1/monetizacao`,
                {mode: 'no-cors'}
            );
            if (response.status === 200 && response.data.status === true) {
                response.data.data.forEach(element => {
                    let indexOfCat = findCategoria(data, element.categoria);

                    if ( indexOfCat === -1 ) 
                        data.push({
                            categoria: element.categoria,
                            temas: [
                                {
                                    id_Mon: element.id_Mon,
                                    nome: element.nome,
                                    descricao: element.descricao,
                                    imagem: element.imagem,
                                    valor: element.valor
                                }
                            ]
                        })
                    else {
                        let indexOfCat = findCategoria(data, element.categoria);

                        if (findTema(data[indexOfCat].temas, element.nome) === -1)
                            data[indexOfCat].temas.push(
                                {
                                    id_Mon: element.id_Mon,
                                    nome: element.nome,
                                    descricao: element.descricao,
                                    imagem: element.imagem,
                                    valor: element.valor
                                }
                        )
                }
                });
            };
            setTodosTemas({loading: false, data: data});
            console.log('resposta temas:',response)
            
        } catch (error) {
            console.error(error);
        };
    };

    const findCategoria = (array, value) => {
        if (array.length !== 0){
            for (let index = 0; index < array.length; index++) {
                const element = array[index].categoria;
                if (element === value) 
                    return index
            };
            return -1;
        } 
        else return -1
    };

    const findTema = (array, value) => {
        if (array.length !== 0){
            for (let index = 0; index < array.length; index++) {
                const element = array[index].nome;
                if (element === value) 
                    return index
            };
            return -1;
        } 
        else return -1
    };

    // Notificacao
    const [openNotificacao, setOpenNotificacao] = React.useState({
        msg: '',
        open: false,
        severity: 'info'
    });

    return <AuthContext.Provider
        value={{
            auth: auth,
            setAuth,
            // ValidateLogin,
            opcao: opcao,
            setOpcao,
            cookieAuth,
            setCookieAuth,
            ValidaCookie,
            cadastro,
            RealizaCadastro,
            RealizaLogin,
            userId,
            todosTemas,
            BuscaTemas,
            ConsultaCarteira, AlteraCarteira, carteira,
            openNotificacao, setOpenNotificacao
        }}
    >
        {children}
    </AuthContext.Provider>
};

export default AuthContext;
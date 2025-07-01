import React, { useState, useRef, useContext } from 'react';
import { Container, Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from "react-router-dom";
import geralContext from "../contexts/btscontext";
// import api from '../../servicos/api';


function CadastroAno() {
  const navigate = useNavigate();

  const [marcaId, setMarcaId, marcaNome, setMarcaNome, modeloid, setModeloId, modeloNome, setModeloNome, 
    anoid, setAnoId, anoNome, setAnoNome] = useContext(geralContext); 
    const formRef = useRef(null); 
  


  const [dadosAno, setDadosAno] = useState({
    id:'',
    nome: '',
    id_modelo:'',
  });


  const [status, setStatus] = useState({
    type:'',
    mensagem:''
  })
  

  const valorInput = (e) => {
    setDadosAno({...dadosAno, [e.target.name]: e.target.value});
  };


  
  const cadAno = async e => {
    e.preventDefault();

    const camposVazios = Object.values(dadosAno).every(value=> value === '');


    if (!dadosAno.nome) {
      setStatus({
        type: 'erro',
        mensagem: 'Por favor, o campo "Nome" é de preenchimento obrigatório.'
      });
      return;
    }
  
    dadosAno.id_modelo = modeloid;
    console.log('IdModelo/',modeloid)
    api.post("ano",dadosAno)
      .then((response) => {
        console.log(response);

        if (response.data.erro) {
          setStatus({
            type: 'erro',
            mensagem: response.data.mensagem
          });
        } else {
          setStatus({
            type: 'success',
            mensagem: 'Ano cadastrado com sucesso.'
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setStatus({
          type: 'erro',
          mensagem: 'Ano não foi cadastrado, tente mais tarde.'
        });
      });
        handleLimpar();
            setTimeout(() => {
              setStatus({
                type:'',
                mensagem:''
              });
            }, 2000);
    }


    const handleLimpar = () => {
      setDadosAno({
        nome: "",
      });
      formRef.current.elements.nome.focus();
    };

    const irPara = () => {
      navigate('/listagempecas/');
    }


  return (


    <Container>  

    <Form className="card-body">
        <h4 className="card-title">Cadastro dos Anos</h4>
        <p className="fst-italic">Marca: <strong>{marcaNome}</strong>/{' '} Modelo: <strong>{modeloNome}</strong>{' '}</p>  
    </Form><br/>

        {status.type === 'erro' ? <div className="alert alert-danger" role="alert">{status.mensagem}</div> :""}
        {status.type === 'success' ? <div className="alert alert-success" role="alert">{status.mensagem}</div> :""}
        <br/>

    <Form ref={formRef} >            
        <Row>
            <Col>
                <Form.Label>Ano</Form.Label><br/>
                <Form.Control className='data-field' type="text" name="nome"  placeholder="Digite o ano" value={dadosAno.nome} onChange={valorInput} /><br/>
            </Col>
        </Row>   
    </Form>

          <Form>
              <Button variant="outline-success" type="button" onClick={cadAno}>Cadastrar</Button>{' '}   
              <Button variant="outline-warning" type="button" onClick={handleLimpar}>Cancelar</Button>{' '}  
              <Button variant="outline-primary" type="button" onClick={irPara}>Escolher Marca/Modelo</Button>
          </Form>
    
</Container>


  );
}

export default CadastroAno
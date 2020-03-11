import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button
} from 'reactstrap';

import { getPokemonsStats } from '../actions/pokemonActions';

const Landing = ({ getPokemonsStats, pokemonsStats: { pokemonsStats, loading } }) => {
  useEffect(() => {
    getPokemonsStats(15);
  }, [getPokemonsStats]);

  console.log('Landing pokemonsStats:', pokemonsStats);

  const types = pokemonsStats && pokemonsStats.length > 0 && pokemonsStats.map(item => item.types);
  console.log('Landing types:', types);

  const typeNames = types && types.length > 0 && types.map(type => type.map(tp => tp.type.name));
  console.log('Landing typeNames:', typeNames);

  return (
    loading
      ? "loading..."
      : (
        <Container>
          <Row>
            {pokemonsStats && pokemonsStats.length > 0 && pokemonsStats.map(item => {
              // console.log('Landing pokemonsStats item:', item);
              return (
                <Col sm='6' md='4' key={item.name} style={{margin: '5px 0'}}>
                  <Card>
                    <CardImg top src={item.pic} alt='Pokemon image' />
                    <CardBody>
                      <CardSubtitle>Name: {item.name}</CardSubtitle>
                      <CardSubtitle>
                        Types: {item.types.map(type => type.type.name).join(', ')}
                      </CardSubtitle>
                      <Button>Click for more specs</Button>
                    </CardBody>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      )
  );
};

Landing.propTypes = {
  getPokemonsStats: PropTypes.func.isRequired,
  pokemonsStats: PropTypes.shape({
    pokemonsStats: PropTypes.array,
    loading: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  pokemonsStats: state.pokemonsStats
});

export default connect(mapStateToProps, { getPokemonsStats })(Landing);

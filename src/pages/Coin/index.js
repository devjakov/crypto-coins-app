function Coin(props) {
    const {id} = props.match.params;
    console.log(props)
    return <h2>This is where the {id} page will be. maybe haha</h2>;
  }

export default Coin;
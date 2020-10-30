import React from "react";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

//서치전에 사진들 보여주고싶으면 쿼리 사용해서 하면됨!

//클래스 컴포넌트는 훅 사용안됨
export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => (
      <SearchBar
        value={navigation.getParam("term", "")}
        onChange={navigation.getParam("onChange", () => null)}
        onSubmit={navigation.getParam("onSubmit", () => null)}
      />
    ),
  });
  constructor(props) {
    //클래스가 처음 만들어질때 실행되는 함수!
    super(props);
    const { navigation } = props;
    //screen이니까 props에 navigation이 전달됨
    this.state = {
      term: "",
      shouldFetch: false,
    }; // 여기state를 navigation option에 값을 줄수있어야한다!
    navigation.setParams({
      //파라미터 설정 끝.. get통해 가져오면됨!
      // term: "this.state.term",
      // onChange: this.onChange,
      // onSubmit: this.onSubmit,
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit,
    }); //confirm에서 이용했던 getParams와 같이 set을 이용할것임!
  }
  onChange = (text) => {
    const { navigation } = this.props;
    this.setState({ term: text, shouldFetch: false });
    navigation.setParams({
      term: text,
    }); //state도 갱신하고, navigation의 prameter도 갱신하는것임!
  }; //term에 저장을 해둬야 나중에 검색 퀴리에 term을 사용 가능!!
  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}

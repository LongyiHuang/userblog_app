import React from 'react';
import ArticleForm from '../../components/article/ArticleForm';
import { connect } from 'dva';

class ArticleDetailPage extends React.Component{

    saveHandler = (values) => {
      const id = this.props.match.params.id;
      if(id){
        this.props.dispatch({
          type: 'article/patch',
          payload: {
            id:id,
            values:values
          }
        })
      }else{
        this.props.dispatch({
          type: 'article/create',
          payload: values
        })
      }
    }

    componentDidMount() {
      const id = this.props.match.params.id;
      if (id) {
        this.props.dispatch({
          type: 'article/fetchOne',
          payload: id
        });
      } else{
        this.props.dispatch({
          type:'article/changeState',
          payload:{
            current:{}
          }
        });
      }
    }



    render(){
      const { loading,current,dispatch } = this.props;
      return(
          <ArticleForm onSave={this.saveHandler} loading={ loading } current={current} dispatch={dispatch}/>
      );
    }
}

ArticleDetailPage.propTypes = {

}

const mapStateToProps = (state) => {
  return {
    loading:state.loading.models.article,
    current:state.article.current,
  }
}

export default connect(mapStateToProps)(ArticleDetailPage);

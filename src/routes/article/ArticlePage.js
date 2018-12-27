import React from 'react';
import { connect } from 'dva'
import ArticleList from "../../components/article/ArticleList";
import { Button } from 'antd'
import PropTypes from 'prop-types';
import styles from './ArticlePage.css';

class ArticlePage extends React.Component{

    componentDidMount(){
       const { dispatch,list,pageSize} = this.props;
       if(list.length <= 0){
          dispatch({type:'article/fetch',payload:{pageNumber:1, pageSize:pageSize }});
       }
    }

    handleCreateArticle = () =>{
      this.props.history.push("/article/new");
    }

    deleteHandler = (id) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'article/remove',
        payload: id,
      });
    }

    pageNumberChangeHandler = (pageNumber,pageSize) => {
      this.props.dispatch({type:'article/fetch',payload:{pageNumber:pageNumber, pageSize:pageSize }});
    }

    pageSizeChangeHandler = (pageNumber,pageSize) => {
      this.props.dispatch({type:'article/fetch',payload:{pageNumber:1, pageSize:pageSize }});
    }



    render(){
      const { loading,list,pageNumber,pageSize,total } = this.props;
        return(
          <div>
            <div className={styles.create}>
              <Button type="primary" onClick={this.handleCreateArticle}>Create Article</Button>
            </div>
            <ArticleList
              list={list}
              loading={loading}
              pageNumber={pageNumber}
              pageSize={pageSize}
              total={total}
              onDelete={this.deleteHandler}
              onPageNumberChange={this.pageNumberChangeHandler}
              onPageSizeChange={this.pageSizeChangeHandler}
            />
          </div>
        );
    }
}


ArticlePage.propTypes = {
  list:PropTypes.array.isRequired,
  loading:PropTypes.bool,
  pageNumber:PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
    const{ list,total,pageNumber,pageSize } = state.article;

    return {
        loading:state.loading.models.article,
        list,
        total:parseInt(total,10),
        pageNumber,
        pageSize,
    }
}


export default connect(mapStateToProps)(ArticlePage);

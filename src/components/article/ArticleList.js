import React from 'react';
import { Table,Divider,Popconfirm,Pagination} from 'antd'
import PropTypes from 'prop-types';
import { Link } from 'dva/router';


class ArticleList extends React.Component{

    handleDelete = (id) => {
      this.props.onDelete(id);
    }


    handleShowSizeChange = (pageNumber, pageSize) => {
      this.props.onPageSizeChange(pageNumber,pageSize);
    }

    handlePageChange = (pageNumber,pageSize) => {
      this.props.onPageNumberChange(pageNumber,pageSize);
    }



    render(){
      const { list: dataSource, loading,total,pageNumber,pageSize,} = this.props
      const columns = [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },{
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
      },{
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
      }, {
        title: 'Create Time',
        dataIndex: 'created_at',
        key: 'created_at',
      },{
        title: 'Update Time',
        dataIndex: 'updated_at',
        key: 'updated_at',
      },{
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Link to={ '/article/'+record.id }>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure to delete this article?" onConfirm={this.handleDelete.bind(this,record.id)}>
              <a>Delete</a>
           </Popconfirm>
         </span>
        ),
      }];


      return(
        <div style={{ padding:'1em' }}>

          <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey={record => record.id}
            pagination={false}
          />

          <Pagination style={{ marginTop:'50px',float:'right'}}
                      showSizeChanger
                      onShowSizeChange={this.handleShowSizeChange}
                      onChange={this.handlePageChange}
                      current={pageNumber}
                      total={total}
                      showTotal={total => `Total ${total} items`}
                      pageSize={pageSize}
          />
        </div>
      );
    }
}
ArticleList.propTypes = {
  list:PropTypes.array,
  loading:PropTypes.bool,
  total:PropTypes.number,
  pageNumber:PropTypes.number,
  pageSize:PropTypes.number,

}

export default ArticleList;

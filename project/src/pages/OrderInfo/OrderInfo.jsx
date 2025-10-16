import { useEffect, useState } from 'react'
import { getCookie } from '../../helpers/cookie'
import styles from './OrderInfo.module.css'
import { get } from '../../utils/request'
import { Table, Typography, Image } from "antd";

const { Title, Text } = Typography;

function OrderInfo(){
    const userId = getCookie('id')
    const [account, setAccount] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchAccount = async () => {
            try{
                const data = await get(`accounts/${userId}`)
                setAccount(data)
            } catch (err) {
                console.log(err);
                alert('Đã có lỗi.')
            } finally {
                setLoading(false)
            }   
        }

        fetchAccount()
    }, [])

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (!account) return <p>Không có thông tin tài khoản.</p>;

    const productColumns = [
        {
            title: 'Image',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (src) => (
                <Image src={src} width={50} height={50} preview={false} />
            )
        },
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => (`${price}$`)
        }
    ]

    const orderColumns =[
        {
            title: 'ID',
            dataIndex: 'id',
            onCell: () => ({
                style: { paddingLeft: 30, paddingRight: 30 },
            }),
            key: 'id',
            render: (id) => <Text strong>{id}</Text>
        },
        {
            title: 'Order Date',
            dataIndex: 'date',
            key: 'date',
            onCell: () => ({
                style: { paddingLeft: 30, paddingRight: 30 },
            }),
            render: (date) => {
            const dateOnly = date.split(" ")[1];
            return <span>{dateOnly}</span>;
  },
        },
        {
            title: 'User',
            dataIndex: 'customer',
            onCell: () => ({
                style: { paddingLeft: 30, paddingRight: 30 },
            }),
            render: (_,record)=><Text>{record?.customer.name}</Text>
        },
        {
            title: 'Phone number',
            dataIndex: 'customer',
            onCell: () => ({
                style: { paddingLeft: 30, paddingRight: 30 },
            }),
            render: (_, record) => <Text>{record?.customer.phone}</Text>
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            onCell: () => ({
                style: { paddingLeft: 30, paddingRight: 30 },
            }),
            render: (total)=><Text strong>{total.toFixed(2)}$</Text>
        }
    ]

    return(
        <>
            <Title>Orders</Title>
            <Table
                className={styles.tableOrders}
                dataSource={account.order}
                columns={orderColumns}
                rowKey='id'
                bordered={false}
                pagination={false}
                expandable={{
                    expandedRowRender: (order) => (
                    <Table
                        dataSource={order.products}
                        columns={productColumns}
                        pagination={false}
                        rowKey='id'
                        size='small'
                        className={styles.tableProducts}
                    />
                    ),
                    rowExpandable: (record) => record.products && record.products.length > 0
                }}
            />
        </>
    )
}

export default OrderInfo

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCustomOrder } from '../../redux/actions/transaction/customOrder';
import Mobile from './Mobile/CustomOrder';

function CustomOrder({ getCustomOrder }) {
    const { id } = useParams()

    useEffect(() => {
        getCustomOrder(id)
    }, [getCustomOrder, id])

    return (
        <Mobile />
    )
}

const mapStateToProps = state => ({
    customOrder: state.customOrder.data
})

export default connect(mapStateToProps, {getCustomOrder})(CustomOrder)

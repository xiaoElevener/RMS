import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import styles from './Weather.less';
import { connect } from 'dva';

function Weather({
    city, icon, temperature, name, code, loading,
}) {
    return (
        <Spin spinning={loading}>
            <div className={styles.weather}>
                <div className={styles.left}>
                    <div className={styles.icon}
                        style={{
                            backgroundImage: `url(${require("../../../assets/icon/" + code + ".png")})`,
                        }}
                    />
                    <p>{name}</p>
                </div>
                <div className={styles.right}>
                    <h1 className={styles.temperature}>{`${temperature}°`}</h1>
                    <p className={styles.description}>{city}</p>
                </div>
            </div>
        </Spin>)
}

function mapStateToProps(state) {
    console.log('weather state:'+JSON.stringify(state));
    const { weather } = state.statistical;
    return {
        city: weather.city,
        icon: '',
        temperature: weather.temperature,
        name: weather.text,
        code: weather.code,
        loading: state.loading.models.statistical
    }
}

export default connect(mapStateToProps)(Weather);

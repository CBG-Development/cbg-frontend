import React from 'react';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const GetUser = () => {
    const [userData, setUserData] = React.useState(jwt.decode(localStorage.getItem('player')));

    React.useEffect(() => {
        const interval = setInterval(() => {
            const decoded = jwt.decode(localStorage.getItem('player'));
            if (!_.isEqual(userData, decoded)) setUserData(decoded);
        }, 1000)

        return () => clearInterval(interval);
    }, [userData]);

    return [userData];
}

export default GetUser;
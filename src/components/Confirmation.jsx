import React from 'react';
import { Toast } from 'react-bootstrap';
import tracks from '../data.json'

// export function Confirmation({ data, toggle }) {
//     return (
//         <Toast onClose={() => toggle(false)}>
//             <Toast.Header>
//                 <strong className="mr-auto">{data.track}</strong>
//                 <small className="text-muted">{data.artist}</small>
//             </Toast.Header>
//             <Toast.Body>
//                 {data.info}
//             </Toast.Body>
//         </Toast>
//     );
// }

export function Confirmation({ toggle }) {
    return (
        <Toast onClose={() => toggle(false)}>
            <Toast.Header>
                <strong className="mr-auto">Confirmation</strong>
                <small className="text-muted">Lorem Ip Sum</small>
            </Toast.Header>
            <Toast.Body>
                Lorem Ip Sum
            </Toast.Body>
        </Toast>
    );
}

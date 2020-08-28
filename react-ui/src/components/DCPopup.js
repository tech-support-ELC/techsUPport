import React from 'react';
// import { Link } from 'react-router-dom'
import Modal from 'react-modal'

export default class DailyCheckInPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: true };
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div>
                <Modal
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div>
                        <a onClick={this.closeModal}>
                            &times;
                        </a>
                        <div>Fill out your daily check-in!</div>
                        {/* <Link to='/dailycheckin/score'>Click to fill out</Link> */}
                    </div>
                </Modal>
            </div>
        );
    }
}


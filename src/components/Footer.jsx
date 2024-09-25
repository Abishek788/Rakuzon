import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <>
            <div className={styles.banner}>
                Rakuzon gives 15% off
                <a href="/collection" className={styles.shopButton}>Shop Now</a>
            </div>

            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.section}>
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">News</a></li>
                            <li><a href="#">Sustainability</a></li>
                        </ul>
                    </div>
                    <div className={styles.section}>
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Shipping Info</a></li>
                            <li><a href="#">Size Guide</a></li>
                        </ul>
                    </div>
                    <div className={styles.section}>
                        <h3>Follow Us</h3>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2024 Nike, Inc. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;

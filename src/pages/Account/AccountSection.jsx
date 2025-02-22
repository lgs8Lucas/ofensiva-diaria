import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Account.module.css";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";

const AccountSection = ({ icon, title }) => {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.section}>
			<div className={styles.sectionHeader}>
				<div className={styles.title}>
					<FontAwesomeIcon icon={icon} />
					<span>{title}</span>
				</div>
				<FontAwesomeIcon icon={faTurnDown} />
			</div>
            {show && {
                
            }}
		</div>
	);
};

export default AccountSection;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./Account.module.css";
import { faTurnDown, faTurnUp } from "@fortawesome/free-solid-svg-icons";

const AccountSection = ({ icon, title, children }) => {
	const [show, setShow] = useState(false);
	return (
		<li className={`${styles.section}`}>
			<button className={styles.sectionHeader} onClick={_=>setShow(!show)}>
				<div className={styles.title}>
					<FontAwesomeIcon icon={icon} />
					<span>{title}</span>
				</div>
				{show?(<FontAwesomeIcon icon={faTurnUp}/>):(<FontAwesomeIcon icon={faTurnDown} />)}
			</button>
            {show && 
                children
            }
		</li>
	);
};

export default AccountSection;

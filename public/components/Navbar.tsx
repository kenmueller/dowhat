import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

import styles from 'styles/components/Navbar.module.scss'

const Navbar = () => (
	<nav className={styles.root}>
		<Link href="/">
			<a className={styles.title}>
				do
				<span className={styles.what}>what</span>
			</a>
		</Link>
		<button className={styles.profileButton}>
			<p className={styles.profileName}>
				Anonymous
			</p>
			<FontAwesomeIcon icon={faChevronCircleDown} height={22} />
		</button>
	</nav>
)

export default Navbar

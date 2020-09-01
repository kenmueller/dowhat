import Head from 'next/head'

import Navbar from 'components/Navbar'

import styles from 'styles/pages/index.module.scss'

const Home = () => (
	<div className={styles.root}>
		<Head>
			<title>dowhat</title>
		</Head>
		<Navbar />
	</div>
)

export default Home

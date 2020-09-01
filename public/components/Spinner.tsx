import cx from 'classnames'

import styles from 'styles/components/Spinner.module.scss'

const Spinner = ({ className }: { className?: string }) => (
	<span className={cx(styles.root, className)} />
)

export default Spinner

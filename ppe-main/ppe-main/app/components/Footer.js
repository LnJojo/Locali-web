import Link from "next/link"

function Footer() {
    return (
        <footer className="p-4 w-full text-center dark:bg-gray-600 dark:text-white">
            <hr className="wt-footer" />
            <div className="wt-positionFooter">
                <div>
                    <h3 className="wt-h3"> Aide et support</h3>
                    <ul>
                        <li className="wt-item">
                            <Link href="/contact" rel="noreferrer nofollow">Contact</Link>
                        </li>
                        <li className="wt-item">
                            <Link href="/about" rel="noreferrer nofollow">A propos</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="wt-footer" />
            <span className="wt-span">© 2023-<span id="currentYear"></span>
                Local.i. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer
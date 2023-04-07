import React, {useState} from "react";
import {Panel} from "primereact/panel";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {TabMenu} from "primereact/tabmenu";

export default function Home({ posts }) {
    console.log(posts);

    const [activeIndex, setActiveIndex] = useState(3);
    const items = [
        {label: 'Javni dio', icon: 'pi pi-fw pi-home'},
        {label: 'CMS dio', icon: 'pi pi-fw pi-cog'},
        {label: 'Privatni dio', icon: 'pi pi-fw pi-pencil'},
    ];

    function goTo(e) {
        setActiveIndex(e.index);
    }

    return (
        <div style={{margin: '5%'}}>
            <Panel header="Header" className="custom-panel">
                {posts.map((post) => (
                    <li key={post}>{post.text} - {post.textType}</li>
                ))}

                <div style={{padding: '30px'}}></div>

                <div className="card">
                    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => goTo(e)} />
                </div>
            </Panel>
        </div>

    );
}

export async function getStaticProps() {
    let posts;
    const res = await fetch('http://localhost:8081/text/getAllText');

    if (res)
        posts = await res.json();

    return {
        props: {
            posts
        }
    }
}

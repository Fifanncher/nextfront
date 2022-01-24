import Head from 'next/head'
const Meta = (props) => (
    <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.desc} />
         {
            props.image &&
                <meta property="og:image" content={`${props.image}`} />
        }
        {
            props.canonical &&
            <link rel="canonical" href={`${props.canonical}`} />
        }
        {
            props.js &&
            <script type="text/javascript" src={`${props.js}`}></script>
        }
        {
             props.breadcumbs &&
             <script type="application/ld+json"
                     dangerouslySetInnerHTML={{
                             __html: JSON.stringify(props.breadcumbs)
                     }}>
             </script>
        }
    </Head>
)
export default Meta

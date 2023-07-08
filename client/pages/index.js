// import Link from 'next/link';


const LandingPage = ({ currentUser }) => {
  // const ticketList = tickets.map(ticket => {
  //   return (
  //     <tr key={ticket.id}>
  //       <td>{ticket.title}</td>
  //       <td>{ticket.price}</td>
  //       <td>
  //         <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
  //           <div className="nav-link" >View</div>
  //         </Link>
  //       </td>
  //     </tr>
  //   );
  // })

  return (
    <div>
      <h1>LandingPage</h1>
    </div>
  )
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  // const { data } = await client.get('/api/tickets');

  // return { tickets: data };
};

export default LandingPage;
import Link from 'next/link';
import { getDataFromTree } from '@apollo/react-ssr';
import PortfolioCard from '@/components/portfolios/portfolio-card';
import withApollo from '@/hoc/withApollo';
import {
  useGetPortfolios,
  useUpdatePortfolio,
  useDeletePortfolio,
  useCreatePortfolio,
} from '@/apollo/actions';

const Portfolios = () => {
  const { data } = useGetPortfolios();
  const [createPortfolio] = useCreatePortfolio();
  const [updatePortfolio] = useUpdatePortfolio();
  const [deletePortfolio] = useDeletePortfolio();

  const portfolios = (data && data.portfolios) || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <button onClick={createPortfolio} className="btn btn-primary">
        Create Portfolio
      </button>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className="card-link">
                  <PortfolioCard portfolio={portfolio} />
                </a>
              </Link>
              <button
                className="btn btn-warning"
                onClick={() =>
                  updatePortfolio({ variables: { id: portfolio._id } })
                }
              >
                Update Portfolio
              </button>
              <button
                onClick={() =>
                  deletePortfolio({ variables: { id: portfolio._id } })
                }
                className="btn btn-danger"
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default withApollo(Portfolios, { getDataFromTree });

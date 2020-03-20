import Link from 'next/link';
import './FunctionCard.css';

const FunctionCard = (props) =>  (
    <Link href={`/functions/${props.slug}`}>
        <div className="FunctionCard col-sm-24 col-md-10 col-xl-7">
            <div className="FunctionCard__top">
                <img className="FunctionCard__image" alt={props.title} src={props.image} />
                <h2 className="FunctionCard__title">{props.title}</h2>
                <p className="FunctionCard__description">{props.description}</p>
            </div>
            <div className="FunctionCard__info">
                <p className="FunctionCard__category" style={{ backgroundColor: props.category.color }}>{props.category.name}</p>
                <p className="FunctionCard__publication-date">{props.publicationDate}</p>
            </div>
        </div>
    </Link>
);

export default FunctionCard;
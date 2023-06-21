import { removeItemFromCart } from '../../components/utils/Shop/RemoveItemFromCart';

export default async function removeFromCart(_req, res) {
    console.log('hello?');

    const { cartId, lineId } = _req.body ?? '{}';
    console.log('headers:', _req.body);
    try {
        console.log('--------------------------------');
        console.log('Removing item from cart...');
        console.log('--------------------------------');
        const response = await removeItemFromCart({
            cartId,
            lineId,
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response.cartLinesRemove.cart),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error }),
        };
    }
}

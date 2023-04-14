import { redirect } from '@sveltejs/kit';
import * as d3 from "d3"

export const actions = {
	default: async ({ locals, request }) => {
    const formData = await request.formData();

    console.log([...formData]);


    const structure = formData.get('structure');
    console.log(structure)
    // const data = await d3.csv(structure)
    // console.log(data)
    // structure.forEach(line => {
    //     console.log(line)
    //   })

      const reader = new FileReader();

      reader.readAsDataURL(structure);

    // const data = Object.fromEntries([...formData]);
		// try {
		// 	await locals.pb.collection('users').authWithPassword(data.email, data.password);
		// } catch (e) {
		// 	console.error(e);
		// 	throw e;
		// }

		throw redirect(303, '/');
	}
};

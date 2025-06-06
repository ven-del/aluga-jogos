import supabase from '../supabase';

export const supabaseService = {
    getAll: async (table) => {
        try {
            const { data, error } = await supabase
              .from(table)
              .select("*")
              .order("id", { ascending: true });


            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Erro ao buscar dados de ${table}:`, error);
            throw error;
        }
    },

    create: async (table, item) => {
        try {
            const { data, error } = await supabase
                .from(table)
                .insert(item)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Erro ao criar item em ${table}:`, error);
            throw error;
        }
    },

    update: async (table, id, item) => {
        try {
            const { data, error } = await supabase
              .from(table)
              .update(item)
              .eq("id", id)
              .select()
              .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Erro ao atualizar item ${id} em ${table}:`, error);
            throw error;
        }
    },

    delete: async (table, id) => {
        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error(`Erro ao deletar item ${id} em ${table}:`, error);
            throw error;
        }
    }
};
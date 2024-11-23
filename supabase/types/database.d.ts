export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    avatar: string | null
                    bio: string | null
                    birth_year: number | null
                    company: string | null
                    country: string | null
                    first_name: string | null
                    gender: Database['public']['Enums']['enum_gender'] | null
                    id: number
                    last_name: string | null
                    title: string | null
                    username: string
                }
                Insert: {
                    avatar?: string | null
                    bio?: string | null
                    birth_year?: number | null
                    company?: string | null
                    country?: string | null
                    first_name?: string | null
                    gender?: Database['public']['Enums']['enum_gender'] | null
                    id: number
                    last_name?: string | null
                    title?: string | null
                    username: string
                }
                Update: {
                    avatar?: string | null
                    bio?: string | null
                    birth_year?: number | null
                    company?: string | null
                    country?: string | null
                    first_name?: string | null
                    gender?: Database['public']['Enums']['enum_gender'] | null
                    id?: number
                    last_name?: string | null
                    title?: string | null
                    username?: string
                }
                Relationships: [
                    {
                        foreignKeyName: 'profiles_id_fkey'
                        columns: ['id']
                        isOneToOne: true
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            settings: {
                Row: {
                    auto_renew: boolean | null
                    id: number
                    notifications: number | null
                    theme: Database['public']['Enums']['enum_theme'] | null
                }
                Insert: {
                    auto_renew?: boolean | null
                    id: number
                    notifications?: number | null
                    theme?: Database['public']['Enums']['enum_theme'] | null
                }
                Update: {
                    auto_renew?: boolean | null
                    id?: number
                    notifications?: number | null
                    theme?: Database['public']['Enums']['enum_theme'] | null
                }
                Relationships: [
                    {
                        foreignKeyName: 'settings_id_fkey'
                        columns: ['id']
                        isOneToOne: true
                        referencedRelation: 'users'
                        referencedColumns: ['id']
                    },
                ]
            }
            stats: {
                Row: {
                    bank: number | null
                    id: number
                    phones: number | null
                    queried_at: string | null
                    subscribers: number | null
                    users: number | null
                    years: number | null
                }
                Insert: {
                    bank?: number | null
                    id?: never
                    phones?: number | null
                    queried_at?: string | null
                    subscribers?: number | null
                    users?: number | null
                    years?: number | null
                }
                Update: {
                    bank?: number | null
                    id?: never
                    phones?: number | null
                    queried_at?: string | null
                    subscribers?: number | null
                    users?: number | null
                    years?: number | null
                }
                Relationships: []
            }
            users: {
                Row: {
                    created_at: string | null
                    currency: number | null
                    email: string
                    id: number
                    password: string
                    phone: string | null
                    private: boolean | null
                    subscriber: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    currency?: number | null
                    email: string
                    id?: never
                    password: string
                    phone?: string | null
                    private?: boolean | null
                    subscriber?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    currency?: number | null
                    email?: string
                    id?: never
                    password?: string
                    phone?: string | null
                    private?: boolean | null
                    subscriber?: boolean | null
                }
                Relationships: []
            }
            users_deleted: {
                Row: {
                    created_at: string | null
                    deleted_at: string | null
                    email: string | null
                    id: number
                    phone: string | null
                    subscriber: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    deleted_at?: string | null
                    email?: string | null
                    id: number
                    phone?: string | null
                    subscriber?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    deleted_at?: string | null
                    email?: string | null
                    id?: number
                    phone?: string | null
                    subscriber?: boolean | null
                }
                Relationships: []
            }
        }
        Views: {
            view_users_basic: {
                Row: {
                    created_at: string | null
                    currency: number | null
                    email: string | null
                    phone: string | null
                    private: boolean | null
                    subscriber: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    currency?: number | null
                    email?: string | null
                    phone?: string | null
                    private?: boolean | null
                    subscriber?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    currency?: number | null
                    email?: string | null
                    phone?: string | null
                    private?: boolean | null
                    subscriber?: boolean | null
                }
                Relationships: []
            }
        }
        Functions: {
            fn_query_stats: {
                Args: Record<PropertyKey, never>
                Returns: undefined
            }
        }
        Enums: {
            enum_gender: 'male' | 'female' | 'nonbinary'
            enum_theme: 'light' | 'dark'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      announcements: {
        Row: {
          audience: string;
          created_at: string;
          ends_at: string | null;
          id: string;
          is_active: boolean;
          link_url: string | null;
          message: string;
          starts_at: string;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          audience?: string;
          created_at?: string;
          ends_at?: string | null;
          id?: string;
          is_active?: boolean;
          link_url?: string | null;
          message: string;
          starts_at?: string;
          updated_at?: string;
        };
        Update: {
          audience?: string;
          created_at?: string;
          ends_at?: string | null;
          id?: string;
          is_active?: boolean;
          link_url?: string | null;
          message?: string;
          starts_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      audit_log: {
        Row: {
          action: string;
          actor_id: string | null;
          id: number;
          new_data: Json | null;
          occurred_at: string;
          old_data: Json | null;
          record_id: string | null;
          table_name: string;
        };
        ComputedFields: never;
        Insert: {
          action: string;
          actor_id?: string | null;
          id?: never;
          new_data?: Json | null;
          occurred_at?: string;
          old_data?: Json | null;
          record_id?: string | null;
          table_name: string;
        };
        Update: {
          action?: string;
          actor_id?: string | null;
          id?: never;
          new_data?: Json | null;
          occurred_at?: string;
          old_data?: Json | null;
          record_id?: string | null;
          table_name?: string;
        };
        Relationships: [];
      };
      care_assignments: {
        Row: {
          client_id: string;
          created_at: string;
          id: string;
          is_active: boolean;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          client_id: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          worker_id: string;
        };
        Update: {
          client_id?: string;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "care_assignments_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_assignments_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      care_clients: {
        Row: {
          address: string | null;
          area: string | null;
          care_summary: string | null;
          created_at: string;
          digital_address: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          full_name: string;
          home_lat: number | null;
          home_lng: number | null;
          id: string;
          is_active: boolean;
          languages: string[];
          preferred_gender: string | null;
          preferred_name: string | null;
          required_skills: string[];
          source_enquiry_id: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        ComputedFields: never;
        Insert: {
          address?: string | null;
          area?: string | null;
          care_summary?: string | null;
          created_at?: string;
          digital_address?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          full_name: string;
          home_lat?: number | null;
          home_lng?: number | null;
          id?: string;
          is_active?: boolean;
          languages?: string[];
          preferred_gender?: string | null;
          preferred_name?: string | null;
          required_skills?: string[];
          source_enquiry_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          address?: string | null;
          area?: string | null;
          care_summary?: string | null;
          created_at?: string;
          digital_address?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          full_name?: string;
          home_lat?: number | null;
          home_lng?: number | null;
          id?: string;
          is_active?: boolean;
          languages?: string[];
          preferred_gender?: string | null;
          preferred_name?: string | null;
          required_skills?: string[];
          source_enquiry_id?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "care_clients_source_enquiry_id_fkey";
            columns: ["source_enquiry_id"];
            isOneToOne: true;
            referencedRelation: "enquiries";
            referencedColumns: ["id"];
          },
        ];
      };
      care_documents: {
        Row: {
          category: string;
          client_id: string | null;
          created_at: string;
          drive_file_id: string;
          id: string;
          mime_type: string;
          name: string;
          report_id: string | null;
          size_bytes: number;
          uploaded_by: string;
          worker_id: string | null;
        };
        ComputedFields: never;
        Insert: {
          category: string;
          client_id?: string | null;
          created_at?: string;
          drive_file_id: string;
          id?: string;
          mime_type: string;
          name: string;
          report_id?: string | null;
          size_bytes: number;
          uploaded_by?: string;
          worker_id?: string | null;
        };
        Update: {
          category?: string;
          client_id?: string | null;
          created_at?: string;
          drive_file_id?: string;
          id?: string;
          mime_type?: string;
          name?: string;
          report_id?: string | null;
          size_bytes?: number;
          uploaded_by?: string;
          worker_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "care_documents_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_documents_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "care_reports";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_documents_report_id_fkey";
            columns: ["report_id"];
            isOneToOne: false;
            referencedRelation: "care_shift_status";
            referencedColumns: ["report_id"];
          },
          {
            foreignKeyName: "care_documents_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_documents_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      care_family_links: {
        Row: {
          client_id: string;
          created_at: string;
          created_by: string | null;
          id: string;
          is_active: boolean;
          relationship: string | null;
          updated_at: string;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          client_id: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_active?: boolean;
          relationship?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          client_id?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          is_active?: boolean;
          relationship?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "care_family_links_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_family_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      care_incidents: {
        Row: {
          action_taken: string;
          client_id: string;
          closed_at: string | null;
          closed_by: string | null;
          created_at: string;
          id: string;
          kind: string;
          occurred_at: string;
          office_notes: string | null;
          people_told: string[];
          place: string | null;
          reference: string;
          reported_by: string;
          severity: string;
          status: string;
          updated_at: string;
          what_happened: string;
          witnesses: string | null;
        };
        ComputedFields: never;
        Insert: {
          action_taken: string;
          client_id: string;
          closed_at?: string | null;
          closed_by?: string | null;
          created_at?: string;
          id?: string;
          kind: string;
          occurred_at: string;
          office_notes?: string | null;
          people_told?: string[];
          place?: string | null;
          reference?: string;
          reported_by?: string;
          severity: string;
          status?: string;
          updated_at?: string;
          what_happened: string;
          witnesses?: string | null;
        };
        Update: {
          action_taken?: string;
          client_id?: string;
          closed_at?: string | null;
          closed_by?: string | null;
          created_at?: string;
          id?: string;
          kind?: string;
          occurred_at?: string;
          office_notes?: string | null;
          people_told?: string[];
          place?: string | null;
          reference?: string;
          reported_by?: string;
          severity?: string;
          status?: string;
          updated_at?: string;
          what_happened?: string;
          witnesses?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "care_incidents_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_incidents_reported_by_fkey";
            columns: ["reported_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      care_plans: {
        Row: {
          about_me: string | null;
          client_id: string;
          created_at: string;
          goals: string[];
          medication_notes: string | null;
          review_date: string | null;
          risks: string | null;
          updated_at: string;
          updated_by: string | null;
          visit_tasks: string[];
        };
        ComputedFields: never;
        Insert: {
          about_me?: string | null;
          client_id: string;
          created_at?: string;
          goals?: string[];
          medication_notes?: string | null;
          review_date?: string | null;
          risks?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          visit_tasks?: string[];
        };
        Update: {
          about_me?: string | null;
          client_id?: string;
          created_at?: string;
          goals?: string[];
          medication_notes?: string | null;
          review_date?: string | null;
          risks?: string | null;
          updated_at?: string;
          updated_by?: string | null;
          visit_tasks?: string[];
        };
        Relationships: [
          {
            foreignKeyName: "care_plans_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: true;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
        ];
      };
      care_reports: {
        Row: {
          activities: string[];
          client_id: string;
          concern_level: Database["public"]["Enums"]["care_concern"];
          concerns: string | null;
          end_time: string | null;
          id: string;
          location_accuracy_m: number | null;
          location_captured_at: string | null;
          location_lat: number | null;
          location_lng: number | null;
          location_status: string;
          meals: string | null;
          medication: string | null;
          mood: Database["public"]["Enums"]["care_mood"];
          office_note: string | null;
          reference: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          shift_id: string | null;
          start_time: string | null;
          status: Database["public"]["Enums"]["care_report_status"];
          submitted_at: string;
          summary: string;
          tasks_done: string[];
          updated_at: string;
          visit_date: string;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          activities?: string[];
          client_id: string;
          concern_level?: Database["public"]["Enums"]["care_concern"];
          concerns?: string | null;
          end_time?: string | null;
          id?: string;
          location_accuracy_m?: number | null;
          location_captured_at?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          location_status?: string;
          meals?: string | null;
          medication?: string | null;
          mood: Database["public"]["Enums"]["care_mood"];
          office_note?: string | null;
          reference?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          shift_id?: string | null;
          start_time?: string | null;
          status?: Database["public"]["Enums"]["care_report_status"];
          submitted_at?: string;
          summary: string;
          tasks_done?: string[];
          updated_at?: string;
          visit_date?: string;
          worker_id?: string;
        };
        Update: {
          activities?: string[];
          client_id?: string;
          concern_level?: Database["public"]["Enums"]["care_concern"];
          concerns?: string | null;
          end_time?: string | null;
          id?: string;
          location_accuracy_m?: number | null;
          location_captured_at?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          location_status?: string;
          meals?: string | null;
          medication?: string | null;
          mood?: Database["public"]["Enums"]["care_mood"];
          office_note?: string | null;
          reference?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          shift_id?: string | null;
          start_time?: string | null;
          status?: Database["public"]["Enums"]["care_report_status"];
          submitted_at?: string;
          summary?: string;
          tasks_done?: string[];
          updated_at?: string;
          visit_date?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "care_reports_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_reports_shift_id_fkey";
            columns: ["shift_id"];
            isOneToOne: false;
            referencedRelation: "care_shift_status";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_reports_shift_id_fkey";
            columns: ["shift_id"];
            isOneToOne: false;
            referencedRelation: "care_shifts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_reports_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      care_shifts: {
        Row: {
          client_id: string;
          created_at: string;
          created_by: string | null;
          end_time: string;
          id: string;
          notes: string | null;
          shift_date: string;
          start_time: string;
          status: string;
          updated_at: string;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          client_id: string;
          created_at?: string;
          created_by?: string | null;
          end_time: string;
          id?: string;
          notes?: string | null;
          shift_date: string;
          start_time: string;
          status?: string;
          updated_at?: string;
          worker_id: string;
        };
        Update: {
          client_id?: string;
          created_at?: string;
          created_by?: string | null;
          end_time?: string;
          id?: string;
          notes?: string | null;
          shift_date?: string;
          start_time?: string;
          status?: string;
          updated_at?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "care_shifts_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_shifts_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      certificates: {
        Row: {
          accrediting_body: string | null;
          certification_type: Database["public"]["Enums"]["certification_type"];
          completed_on: string;
          course_id: string | null;
          course_title: string;
          cpd_hours: number | null;
          enrolment_id: string | null;
          id: string;
          issued_at: string;
          issued_by: string | null;
          learner_name: string;
          number: string;
          revoked_at: string | null;
          revoked_reason: string | null;
          user_id: string | null;
          verify_code: string;
        };
        ComputedFields: never;
        Insert: {
          accrediting_body?: string | null;
          certification_type?: Database["public"]["Enums"]["certification_type"];
          completed_on?: string;
          course_id?: string | null;
          course_title: string;
          cpd_hours?: number | null;
          enrolment_id?: string | null;
          id?: string;
          issued_at?: string;
          issued_by?: string | null;
          learner_name: string;
          number?: string;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          user_id?: string | null;
          verify_code?: string;
        };
        Update: {
          accrediting_body?: string | null;
          certification_type?: Database["public"]["Enums"]["certification_type"];
          completed_on?: string;
          course_id?: string | null;
          course_title?: string;
          cpd_hours?: number | null;
          enrolment_id?: string | null;
          id?: string;
          issued_at?: string;
          issued_by?: string | null;
          learner_name?: string;
          number?: string;
          revoked_at?: string | null;
          revoked_reason?: string | null;
          user_id?: string | null;
          verify_code?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificates_enrolment_id_fkey";
            columns: ["enrolment_id"];
            isOneToOne: true;
            referencedRelation: "course_enrolments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "certificates_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      community_event_links: {
        Row: {
          event_id: string;
          online_url: string;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          event_id: string;
          online_url: string;
          updated_at?: string;
        };
        Update: {
          event_id?: string;
          online_url?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "community_event_links_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: true;
            referencedRelation: "community_events";
            referencedColumns: ["id"];
          },
        ];
      };
      community_events: {
        Row: {
          capacity: number | null;
          created_at: string;
          description: string | null;
          ends_at: string | null;
          id: string;
          image_path: string | null;
          kind: string;
          online: boolean;
          registration_open: boolean;
          slug: string;
          speaker: string | null;
          starts_at: string;
          status: string;
          summary: string | null;
          title: string;
          topic: string | null;
          updated_at: string;
          venue: string | null;
        };
        ComputedFields: never;
        Insert: {
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          image_path?: string | null;
          kind?: string;
          online?: boolean;
          registration_open?: boolean;
          slug: string;
          speaker?: string | null;
          starts_at: string;
          status?: string;
          summary?: string | null;
          title: string;
          topic?: string | null;
          updated_at?: string;
          venue?: string | null;
        };
        Update: {
          capacity?: number | null;
          created_at?: string;
          description?: string | null;
          ends_at?: string | null;
          id?: string;
          image_path?: string | null;
          kind?: string;
          online?: boolean;
          registration_open?: boolean;
          slug?: string;
          speaker?: string | null;
          starts_at?: string;
          status?: string;
          summary?: string | null;
          title?: string;
          topic?: string | null;
          updated_at?: string;
          venue?: string | null;
        };
        Relationships: [];
      };
      course_enrolments: {
        Row: {
          completed_at: string | null;
          course_id: string;
          enrolled_at: string;
          enrolled_by: string | null;
          id: string;
          source: string;
          status: string;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          completed_at?: string | null;
          course_id: string;
          enrolled_at?: string;
          enrolled_by?: string | null;
          id?: string;
          source?: string;
          status?: string;
          user_id: string;
        };
        Update: {
          completed_at?: string | null;
          course_id?: string;
          enrolled_at?: string;
          enrolled_by?: string | null;
          id?: string;
          source?: string;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "course_enrolments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "course_enrolments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      course_lessons: {
        Row: {
          body: string | null;
          course_id: string;
          created_at: string;
          id: string;
          minutes: number | null;
          published: boolean;
          resource_label: string | null;
          resource_url: string | null;
          section: string | null;
          sort_order: number;
          title: string;
          updated_at: string;
          video_url: string | null;
        };
        ComputedFields: never;
        Insert: {
          body?: string | null;
          course_id: string;
          created_at?: string;
          id?: string;
          minutes?: number | null;
          published?: boolean;
          resource_label?: string | null;
          resource_url?: string | null;
          section?: string | null;
          sort_order?: number;
          title: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Update: {
          body?: string | null;
          course_id?: string;
          created_at?: string;
          id?: string;
          minutes?: number | null;
          published?: boolean;
          resource_label?: string | null;
          resource_url?: string | null;
          section?: string | null;
          sort_order?: number;
          title?: string;
          updated_at?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "course_lessons_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      course_quiz_questions: {
        Row: {
          correct_option: number;
          course_id: string;
          created_at: string;
          explanation: string | null;
          id: string;
          options: string[];
          question: string;
          sort_order: number;
        };
        ComputedFields: never;
        Insert: {
          correct_option: number;
          course_id: string;
          created_at?: string;
          explanation?: string | null;
          id?: string;
          options: string[];
          question: string;
          sort_order?: number;
        };
        Update: {
          correct_option?: number;
          course_id?: string;
          created_at?: string;
          explanation?: string | null;
          id?: string;
          options?: string[];
          question?: string;
          sort_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "course_quiz_questions_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          },
        ];
      };
      courses: {
        Row: {
          accreditation_reference: string | null;
          accrediting_body: string | null;
          audience: Database["public"]["Enums"]["course_audience"];
          category: string | null;
          certification_type: Database["public"]["Enums"]["certification_type"];
          cpd_hours: number | null;
          created_at: string;
          delivery_mode: Database["public"]["Enums"]["delivery_mode"];
          description: NonNullable<Json>;
          duration_text: string | null;
          fee_amount: number | null;
          fee_currency: string;
          id: string;
          image_path: string | null;
          is_signature: boolean;
          learning_outcomes: string[];
          online_enabled: boolean;
          pass_mark: number;
          self_enrol: boolean;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          summary: string | null;
          title: string;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          accreditation_reference?: string | null;
          accrediting_body?: string | null;
          audience?: Database["public"]["Enums"]["course_audience"];
          category?: string | null;
          certification_type?: Database["public"]["Enums"]["certification_type"];
          cpd_hours?: number | null;
          created_at?: string;
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"];
          description?: NonNullable<Json>;
          duration_text?: string | null;
          fee_amount?: number | null;
          fee_currency?: string;
          id?: string;
          image_path?: string | null;
          is_signature?: boolean;
          learning_outcomes?: string[];
          online_enabled?: boolean;
          pass_mark?: number;
          self_enrol?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          title: string;
          updated_at?: string;
        };
        Update: {
          accreditation_reference?: string | null;
          accrediting_body?: string | null;
          audience?: Database["public"]["Enums"]["course_audience"];
          category?: string | null;
          certification_type?: Database["public"]["Enums"]["certification_type"];
          cpd_hours?: number | null;
          created_at?: string;
          delivery_mode?: Database["public"]["Enums"]["delivery_mode"];
          description?: NonNullable<Json>;
          duration_text?: string | null;
          fee_amount?: number | null;
          fee_currency?: string;
          id?: string;
          image_path?: string | null;
          is_signature?: boolean;
          learning_outcomes?: string[];
          online_enabled?: boolean;
          pass_mark?: number;
          self_enrol?: boolean;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          assigned_to: string | null;
          consent_given: boolean;
          consent_version: string;
          country: string | null;
          created_at: string;
          email: string | null;
          enquiry_type: Database["public"]["Enums"]["enquiry_type"];
          full_name: string;
          id: string;
          message: string | null;
          notified_at: string | null;
          payload: NonNullable<Json>;
          phone: string | null;
          source_page: string | null;
          status: Database["public"]["Enums"]["enquiry_status"];
          subject: string | null;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          assigned_to?: string | null;
          consent_given: boolean;
          consent_version?: string;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          enquiry_type: Database["public"]["Enums"]["enquiry_type"];
          full_name: string;
          id?: string;
          message?: string | null;
          notified_at?: string | null;
          payload?: NonNullable<Json>;
          phone?: string | null;
          source_page?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          subject?: string | null;
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          consent_given?: boolean;
          consent_version?: string;
          country?: string | null;
          created_at?: string;
          email?: string | null;
          enquiry_type?: Database["public"]["Enums"]["enquiry_type"];
          full_name?: string;
          id?: string;
          message?: string | null;
          notified_at?: string | null;
          payload?: NonNullable<Json>;
          phone?: string | null;
          source_page?: string | null;
          status?: Database["public"]["Enums"]["enquiry_status"];
          subject?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enquiries_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      enquiry_notes: {
        Row: {
          author_id: string | null;
          body: string;
          created_at: string;
          enquiry_id: string;
          id: string;
        };
        ComputedFields: never;
        Insert: {
          author_id?: string | null;
          body: string;
          created_at?: string;
          enquiry_id: string;
          id?: string;
        };
        Update: {
          author_id?: string | null;
          body?: string;
          created_at?: string;
          enquiry_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "enquiry_notes_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enquiry_notes_enquiry_id_fkey";
            columns: ["enquiry_id"];
            isOneToOne: false;
            referencedRelation: "enquiries";
            referencedColumns: ["id"];
          },
        ];
      };
      event_registrations: {
        Row: {
          attend_mode: string;
          confirmed_at: string | null;
          created_at: string;
          email: string | null;
          event_id: string;
          full_name: string;
          id: string;
          needs: string | null;
          organisation: string | null;
          phone: string | null;
          reminded_at: string | null;
          source: string;
          status: string;
          token: string;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          attend_mode?: string;
          confirmed_at?: string | null;
          created_at?: string;
          email?: string | null;
          event_id: string;
          full_name: string;
          id?: string;
          needs?: string | null;
          organisation?: string | null;
          phone?: string | null;
          reminded_at?: string | null;
          source?: string;
          status?: string;
          token?: string;
          updated_at?: string;
        };
        Update: {
          attend_mode?: string;
          confirmed_at?: string | null;
          created_at?: string;
          email?: string | null;
          event_id?: string;
          full_name?: string;
          id?: string;
          needs?: string | null;
          organisation?: string | null;
          phone?: string | null;
          reminded_at?: string | null;
          source?: string;
          status?: string;
          token?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "community_events";
            referencedColumns: ["id"];
          },
        ];
      };
      lesson_progress: {
        Row: {
          completed_at: string;
          lesson_id: string;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          completed_at?: string;
          lesson_id: string;
          user_id: string;
        };
        Update: {
          completed_at?: string;
          lesson_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "course_lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      media_assets: {
        Row: {
          alt_text: string | null;
          bucket_id: string;
          created_at: string;
          folder: string | null;
          height: number | null;
          id: string;
          mime_type: string | null;
          object_path: string;
          size_bytes: number | null;
          uploaded_by: string | null;
          width: number | null;
        };
        ComputedFields: never;
        Insert: {
          alt_text?: string | null;
          bucket_id?: string;
          created_at?: string;
          folder?: string | null;
          height?: number | null;
          id?: string;
          mime_type?: string | null;
          object_path: string;
          size_bytes?: number | null;
          uploaded_by?: string | null;
          width?: number | null;
        };
        Update: {
          alt_text?: string | null;
          bucket_id?: string;
          created_at?: string;
          folder?: string | null;
          height?: number | null;
          id?: string;
          mime_type?: string | null;
          object_path?: string;
          size_bytes?: number | null;
          uploaded_by?: string | null;
          width?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      navigation_items: {
        Row: {
          created_at: string;
          href: string;
          id: string;
          is_visible: boolean;
          label: string;
          menu: string;
          parent_id: string | null;
          sort_order: number;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          href: string;
          id?: string;
          is_visible?: boolean;
          label: string;
          menu: string;
          parent_id?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          href?: string;
          id?: string;
          is_visible?: boolean;
          label?: string;
          menu?: string;
          parent_id?: string | null;
          sort_order?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "navigation_items";
            referencedColumns: ["id"];
          },
        ];
      };
      newsletter_sends: {
        Row: {
          failed: number;
          finished_at: string | null;
          id: string;
          post_id: string;
          recipients: number;
          sent_by: string | null;
          started_at: string;
        };
        ComputedFields: never;
        Insert: {
          failed?: number;
          finished_at?: string | null;
          id?: string;
          post_id: string;
          recipients?: number;
          sent_by?: string | null;
          started_at?: string;
        };
        Update: {
          failed?: number;
          finished_at?: string | null;
          id?: string;
          post_id?: string;
          recipients?: number;
          sent_by?: string | null;
          started_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "newsletter_sends_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: true;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      newsletter_subscribers: {
        Row: {
          confirm_sent_at: string | null;
          confirmed_at: string | null;
          consent_at: string;
          created_at: string;
          email: string;
          full_name: string | null;
          id: string;
          source_page: string | null;
          status: string;
          token: string;
          unsubscribed_at: string | null;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          confirm_sent_at?: string | null;
          confirmed_at?: string | null;
          consent_at?: string;
          created_at?: string;
          email: string;
          full_name?: string | null;
          id?: string;
          source_page?: string | null;
          status?: string;
          token?: string;
          unsubscribed_at?: string | null;
          updated_at?: string;
        };
        Update: {
          confirm_sent_at?: string | null;
          confirmed_at?: string | null;
          consent_at?: string;
          created_at?: string;
          email?: string;
          full_name?: string | null;
          id?: string;
          source_page?: string | null;
          status?: string;
          token?: string;
          unsubscribed_at?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      notification_recipients: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          topic: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          topic: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          topic?: string;
        };
        Relationships: [];
      };
      page_revisions: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: number;
          page_id: string;
          snapshot: NonNullable<Json>;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: never;
          page_id: string;
          snapshot: NonNullable<Json>;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: never;
          page_id?: string;
          snapshot?: NonNullable<Json>;
        };
        Relationships: [
          {
            foreignKeyName: "page_revisions_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "page_revisions_page_id_fkey";
            columns: ["page_id"];
            isOneToOne: false;
            referencedRelation: "pages";
            referencedColumns: ["id"];
          },
        ];
      };
      pages: {
        Row: {
          body: NonNullable<Json>;
          created_at: string;
          created_by: string | null;
          id: string;
          og_image_path: string | null;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          show_in_sitemap: boolean;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          summary: string | null;
          title: string;
          updated_at: string;
          updated_by: string | null;
        };
        ComputedFields: never;
        Insert: {
          body?: NonNullable<Json>;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          og_image_path?: string | null;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          show_in_sitemap?: boolean;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          title: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          body?: NonNullable<Json>;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          og_image_path?: string | null;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          show_in_sitemap?: boolean;
          slug?: string;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "pages_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "pages_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      partners: {
        Row: {
          created_at: string;
          description: string | null;
          display_permission: boolean;
          display_permission_note: string | null;
          id: string;
          logo_path: string | null;
          name: string;
          partner_type: Database["public"]["Enums"]["partner_type"];
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
          website_url: string | null;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          description?: string | null;
          display_permission?: boolean;
          display_permission_note?: string | null;
          id?: string;
          logo_path?: string | null;
          name: string;
          partner_type: Database["public"]["Enums"]["partner_type"];
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
          website_url?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          display_permission?: boolean;
          display_permission_note?: string | null;
          id?: string;
          logo_path?: string | null;
          name?: string;
          partner_type?: Database["public"]["Enums"]["partner_type"];
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      permissions: {
        Row: {
          action: string;
          description: string | null;
          key: string;
          section: string;
        };
        ComputedFields: never;
        Insert: {
          action: string;
          description?: string | null;
          key: string;
          section: string;
        };
        Update: {
          action?: string;
          description?: string | null;
          key?: string;
          section?: string;
        };
        Relationships: [];
      };
      post_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        ComputedFields: never;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          author_id: string | null;
          author_name: string | null;
          body: NonNullable<Json>;
          category_id: string | null;
          cover_image_path: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          status: Database["public"]["Enums"]["content_status"];
          tags: string[];
          title: string;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          author_id?: string | null;
          author_name?: string | null;
          body?: NonNullable<Json>;
          category_id?: string | null;
          cover_image_path?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          status?: Database["public"]["Enums"]["content_status"];
          tags?: string[];
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          author_name?: string | null;
          body?: NonNullable<Json>;
          category_id?: string | null;
          cover_image_path?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          status?: Database["public"]["Enums"]["content_status"];
          tags?: string[];
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "post_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      product_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          sort_order: number;
        };
        ComputedFields: never;
        Insert: {
          id?: string;
          name: string;
          slug: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          category_id: string | null;
          created_at: string;
          description: string | null;
          id: string;
          image_paths: string[];
          is_available: boolean;
          name: string;
          price_amount: number | null;
          price_currency: string;
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          stock_quantity: number | null;
          updated_at: string;
          variants: NonNullable<Json>;
        };
        ComputedFields: never;
        Insert: {
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_paths?: string[];
          is_available?: boolean;
          name: string;
          price_amount?: number | null;
          price_currency?: string;
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          stock_quantity?: number | null;
          updated_at?: string;
          variants?: NonNullable<Json>;
        };
        Update: {
          category_id?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          image_paths?: string[];
          is_available?: boolean;
          name?: string;
          price_amount?: number | null;
          price_currency?: string;
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          stock_quantity?: number | null;
          updated_at?: string;
          variants?: NonNullable<Json>;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "product_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_path: string | null;
          created_at: string;
          full_name: string | null;
          id: string;
          is_active: boolean;
          phone: string | null;
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          avatar_path?: string | null;
          created_at?: string;
          full_name?: string | null;
          id: string;
          is_active?: boolean;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_path?: string | null;
          created_at?: string;
          full_name?: string | null;
          id?: string;
          is_active?: boolean;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      quiz_attempts: {
        Row: {
          answers: number[];
          created_at: string;
          enrolment_id: string;
          id: string;
          passed: boolean;
          score: number;
          total: number;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          answers: number[];
          created_at?: string;
          enrolment_id: string;
          id?: string;
          passed: boolean;
          score: number;
          total: number;
          user_id: string;
        };
        Update: {
          answers?: number[];
          created_at?: string;
          enrolment_id?: string;
          id?: string;
          passed?: boolean;
          score?: number;
          total?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_enrolment_id_fkey";
            columns: ["enrolment_id"];
            isOneToOne: false;
            referencedRelation: "course_enrolments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_attempts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      recruitment_applicants: {
        Row: {
          availability: string | null;
          created_at: string;
          created_by: string | null;
          email: string | null;
          enquiry_id: string | null;
          experience: string | null;
          full_name: string;
          id: string;
          location: string | null;
          phone: string | null;
          role_applied: string | null;
          stage: string;
          stage_changed_at: string;
          updated_at: string;
          worker_id: string | null;
        };
        ComputedFields: never;
        Insert: {
          availability?: string | null;
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          enquiry_id?: string | null;
          experience?: string | null;
          full_name: string;
          id?: string;
          location?: string | null;
          phone?: string | null;
          role_applied?: string | null;
          stage?: string;
          stage_changed_at?: string;
          updated_at?: string;
          worker_id?: string | null;
        };
        Update: {
          availability?: string | null;
          created_at?: string;
          created_by?: string | null;
          email?: string | null;
          enquiry_id?: string | null;
          experience?: string | null;
          full_name?: string;
          id?: string;
          location?: string | null;
          phone?: string | null;
          role_applied?: string | null;
          stage?: string;
          stage_changed_at?: string;
          updated_at?: string;
          worker_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "recruitment_applicants_enquiry_id_fkey";
            columns: ["enquiry_id"];
            isOneToOne: true;
            referencedRelation: "enquiries";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recruitment_applicants_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      recruitment_checks: {
        Row: {
          applicant_id: string;
          check_key: string;
          checked_at: string;
          checked_by: string | null;
          note: string | null;
          status: string;
        };
        ComputedFields: never;
        Insert: {
          applicant_id: string;
          check_key: string;
          checked_at?: string;
          checked_by?: string | null;
          note?: string | null;
          status: string;
        };
        Update: {
          applicant_id?: string;
          check_key?: string;
          checked_at?: string;
          checked_by?: string | null;
          note?: string | null;
          status?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recruitment_checks_applicant_id_fkey";
            columns: ["applicant_id"];
            isOneToOne: false;
            referencedRelation: "recruitment_applicants";
            referencedColumns: ["id"];
          },
        ];
      };
      recruitment_notes: {
        Row: {
          applicant_id: string;
          author_id: string;
          body: string;
          created_at: string;
          id: string;
        };
        ComputedFields: never;
        Insert: {
          applicant_id: string;
          author_id?: string;
          body: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          applicant_id?: string;
          author_id?: string;
          body?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recruitment_notes_applicant_id_fkey";
            columns: ["applicant_id"];
            isOneToOne: false;
            referencedRelation: "recruitment_applicants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recruitment_notes_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      role_permissions: {
        Row: {
          permission_key: string;
          role_key: string;
        };
        ComputedFields: never;
        Insert: {
          permission_key: string;
          role_key: string;
        };
        Update: {
          permission_key?: string;
          role_key?: string;
        };
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_key_fkey";
            columns: ["permission_key"];
            isOneToOne: false;
            referencedRelation: "permissions";
            referencedColumns: ["key"];
          },
          {
            foreignKeyName: "role_permissions_role_key_fkey";
            columns: ["role_key"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["key"];
          },
        ];
      };
      roles: {
        Row: {
          created_at: string;
          description: string | null;
          is_staff: boolean;
          is_system: boolean;
          key: string;
          name: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          description?: string | null;
          is_staff?: boolean;
          is_system?: boolean;
          key: string;
          name: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          is_staff?: boolean;
          is_system?: boolean;
          key?: string;
          name?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          audience: string | null;
          created_at: string;
          cta_label: string | null;
          description: string | null;
          id: string;
          image_path: string | null;
          includes: string[];
          name: string;
          seo_description: string | null;
          seo_title: string | null;
          service_group: Database["public"]["Enums"]["service_group"];
          slug: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          summary: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        ComputedFields: never;
        Insert: {
          audience?: string | null;
          created_at?: string;
          cta_label?: string | null;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          includes?: string[];
          name: string;
          seo_description?: string | null;
          seo_title?: string | null;
          service_group?: Database["public"]["Enums"]["service_group"];
          slug: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          audience?: string | null;
          created_at?: string;
          cta_label?: string | null;
          description?: string | null;
          id?: string;
          image_path?: string | null;
          includes?: string[];
          name?: string;
          seo_description?: string | null;
          seo_title?: string | null;
          service_group?: Database["public"]["Enums"]["service_group"];
          slug?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          summary?: string | null;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "services_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      site_settings: {
        Row: {
          address: string | null;
          cookie_banner_text: string | null;
          currency: string;
          default_seo: NonNullable<Json>;
          email: string | null;
          id: boolean;
          impact_stats: NonNullable<Json>;
          map_url: string | null;
          opening_hours: NonNullable<Json>;
          organisation_name: string;
          page_banners: NonNullable<Json>;
          phone: string | null;
          recognitions: NonNullable<Json>;
          social_links: NonNullable<Json>;
          supporting_statement: string | null;
          tagline: string;
          timezone: string;
          updated_at: string;
          updated_by: string | null;
          whatsapp_number: string | null;
        };
        ComputedFields: never;
        Insert: {
          address?: string | null;
          cookie_banner_text?: string | null;
          currency?: string;
          default_seo?: NonNullable<Json>;
          email?: string | null;
          id?: boolean;
          impact_stats?: NonNullable<Json>;
          map_url?: string | null;
          opening_hours?: NonNullable<Json>;
          organisation_name?: string;
          page_banners?: NonNullable<Json>;
          phone?: string | null;
          recognitions?: NonNullable<Json>;
          social_links?: NonNullable<Json>;
          supporting_statement?: string | null;
          tagline?: string;
          timezone?: string;
          updated_at?: string;
          updated_by?: string | null;
          whatsapp_number?: string | null;
        };
        Update: {
          address?: string | null;
          cookie_banner_text?: string | null;
          currency?: string;
          default_seo?: NonNullable<Json>;
          email?: string | null;
          id?: boolean;
          impact_stats?: NonNullable<Json>;
          map_url?: string | null;
          opening_hours?: NonNullable<Json>;
          organisation_name?: string;
          page_banners?: NonNullable<Json>;
          phone?: string | null;
          recognitions?: NonNullable<Json>;
          social_links?: NonNullable<Json>;
          supporting_statement?: string | null;
          tagline?: string;
          timezone?: string;
          updated_at?: string;
          updated_by?: string | null;
          whatsapp_number?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      team_members: {
        Row: {
          background: string | null;
          bio: string | null;
          created_at: string;
          experience: string | null;
          full_name: string;
          id: string;
          kind: string;
          photo_crop: string;
          photo_path: string | null;
          position: string | null;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          background?: string | null;
          bio?: string | null;
          created_at?: string;
          experience?: string | null;
          full_name: string;
          id?: string;
          kind: string;
          photo_crop?: string;
          photo_path?: string | null;
          position?: string | null;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          background?: string | null;
          bio?: string | null;
          created_at?: string;
          experience?: string | null;
          full_name?: string;
          id?: string;
          kind?: string;
          photo_crop?: string;
          photo_path?: string | null;
          position?: string | null;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          author_context: string | null;
          author_name: string;
          consent_notes: string | null;
          consent_obtained: boolean;
          consent_recorded_at: string | null;
          created_at: string;
          id: string;
          quote: string;
          sort_order: number;
          status: Database["public"]["Enums"]["content_status"];
          updated_at: string;
        };
        ComputedFields: never;
        Insert: {
          author_context?: string | null;
          author_name: string;
          consent_notes?: string | null;
          consent_obtained?: boolean;
          consent_recorded_at?: string | null;
          created_at?: string;
          id?: string;
          quote: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Update: {
          author_context?: string | null;
          author_name?: string;
          consent_notes?: string | null;
          consent_obtained?: boolean;
          consent_recorded_at?: string | null;
          created_at?: string;
          id?: string;
          quote?: string;
          sort_order?: number;
          status?: Database["public"]["Enums"]["content_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          granted_at: string;
          granted_by: string | null;
          role_key: string;
          user_id: string;
        };
        ComputedFields: never;
        Insert: {
          granted_at?: string;
          granted_by?: string | null;
          role_key: string;
          user_id: string;
        };
        Update: {
          granted_at?: string;
          granted_by?: string | null;
          role_key?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_roles_granted_by_fkey";
            columns: ["granted_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_roles_role_key_fkey";
            columns: ["role_key"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["key"];
          },
          {
            foreignKeyName: "user_roles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      wellbeing_messages: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          id: string;
          internal: boolean;
          request_id: string;
        };
        ComputedFields: never;
        Insert: {
          author_id?: string;
          body: string;
          created_at?: string;
          id?: string;
          internal?: boolean;
          request_id: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          id?: string;
          internal?: boolean;
          request_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wellbeing_messages_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wellbeing_messages_request_id_fkey";
            columns: ["request_id"];
            isOneToOne: false;
            referencedRelation: "wellbeing_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      wellbeing_requests: {
        Row: {
          assigned_to: string | null;
          closed_at: string | null;
          contact_method: string;
          contact_times: string | null;
          created_at: string;
          id: string;
          kind: string;
          message: string;
          reference: string;
          service_id: string | null;
          status: string;
          updated_at: string;
          urgency: string;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          assigned_to?: string | null;
          closed_at?: string | null;
          contact_method?: string;
          contact_times?: string | null;
          created_at?: string;
          id?: string;
          kind: string;
          message: string;
          reference?: string;
          service_id?: string | null;
          status?: string;
          updated_at?: string;
          urgency?: string;
          worker_id?: string;
        };
        Update: {
          assigned_to?: string | null;
          closed_at?: string | null;
          contact_method?: string;
          contact_times?: string | null;
          created_at?: string;
          id?: string;
          kind?: string;
          message?: string;
          reference?: string;
          service_id?: string | null;
          status?: string;
          updated_at?: string;
          urgency?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wellbeing_requests_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wellbeing_requests_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "wellbeing_services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "wellbeing_requests_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      wellbeing_resources: {
        Row: {
          audience: string;
          created_at: string;
          id: string;
          kind: string;
          place: string | null;
          sort_order: number;
          starts_at: string | null;
          status: string;
          summary: string | null;
          title: string;
          updated_at: string;
          url: string | null;
        };
        ComputedFields: never;
        Insert: {
          audience?: string;
          created_at?: string;
          id?: string;
          kind: string;
          place?: string | null;
          sort_order?: number;
          starts_at?: string | null;
          status?: string;
          summary?: string | null;
          title: string;
          updated_at?: string;
          url?: string | null;
        };
        Update: {
          audience?: string;
          created_at?: string;
          id?: string;
          kind?: string;
          place?: string | null;
          sort_order?: number;
          starts_at?: string | null;
          status?: string;
          summary?: string | null;
          title?: string;
          updated_at?: string;
          url?: string | null;
        };
        Relationships: [];
      };
      wellbeing_services: {
        Row: {
          audience: string;
          benefit: string | null;
          created_at: string;
          description: string | null;
          how_to_access: string | null;
          id: string;
          kind: string;
          location: string | null;
          name: string;
          phone: string | null;
          provider: string | null;
          sort_order: number;
          status: string;
          updated_at: string;
          website_url: string | null;
        };
        ComputedFields: never;
        Insert: {
          audience?: string;
          benefit?: string | null;
          created_at?: string;
          description?: string | null;
          how_to_access?: string | null;
          id?: string;
          kind: string;
          location?: string | null;
          name: string;
          phone?: string | null;
          provider?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Update: {
          audience?: string;
          benefit?: string | null;
          created_at?: string;
          description?: string | null;
          how_to_access?: string | null;
          id?: string;
          kind?: string;
          location?: string | null;
          name?: string;
          phone?: string | null;
          provider?: string | null;
          sort_order?: number;
          status?: string;
          updated_at?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      worker_availability: {
        Row: {
          created_at: string;
          end_time: string;
          id: string;
          start_time: string;
          weekday: number;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          end_time: string;
          id?: string;
          start_time: string;
          weekday: number;
          worker_id: string;
        };
        Update: {
          created_at?: string;
          end_time?: string;
          id?: string;
          start_time?: string;
          weekday?: number;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_availability_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      worker_credentials: {
        Row: {
          created_at: string;
          doc_type: string;
          expires_on: string | null;
          id: string;
          issued_on: string | null;
          note: string | null;
          reference: string | null;
          reminder_stage: number;
          status: string;
          submitted_by: string | null;
          title: string | null;
          updated_at: string;
          verified_at: string | null;
          verified_by: string | null;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          doc_type: string;
          expires_on?: string | null;
          id?: string;
          issued_on?: string | null;
          note?: string | null;
          reference?: string | null;
          reminder_stage?: number;
          status?: string;
          submitted_by?: string | null;
          title?: string | null;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          worker_id: string;
        };
        Update: {
          created_at?: string;
          doc_type?: string;
          expires_on?: string | null;
          id?: string;
          issued_on?: string | null;
          note?: string | null;
          reference?: string | null;
          reminder_stage?: number;
          status?: string;
          submitted_by?: string | null;
          title?: string | null;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_credentials_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      worker_profiles: {
        Row: {
          gender: string | null;
          home_area: string | null;
          home_lat: number | null;
          home_lng: number | null;
          languages: string[];
          max_hours_week: number | null;
          notes: string | null;
          skills: string[];
          travel_km: number;
          updated_at: string;
          updated_by: string | null;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          gender?: string | null;
          home_area?: string | null;
          home_lat?: number | null;
          home_lng?: number | null;
          languages?: string[];
          max_hours_week?: number | null;
          notes?: string | null;
          skills?: string[];
          travel_km?: number;
          updated_at?: string;
          updated_by?: string | null;
          worker_id: string;
        };
        Update: {
          gender?: string | null;
          home_area?: string | null;
          home_lat?: number | null;
          home_lng?: number | null;
          languages?: string[];
          max_hours_week?: number | null;
          notes?: string | null;
          skills?: string[];
          travel_km?: number;
          updated_at?: string;
          updated_by?: string | null;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_profiles_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      worker_time_off: {
        Row: {
          created_at: string;
          created_by: string | null;
          ends_on: string;
          id: string;
          kind: string;
          note: string | null;
          starts_on: string;
          worker_id: string;
        };
        ComputedFields: never;
        Insert: {
          created_at?: string;
          created_by?: string | null;
          ends_on: string;
          id?: string;
          kind?: string;
          note?: string | null;
          starts_on: string;
          worker_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          ends_on?: string;
          id?: string;
          kind?: string;
          note?: string | null;
          starts_on?: string;
          worker_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "worker_time_off_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      care_shift_status: {
        Row: {
          client_id: string;
          created_at: string;
          created_by: string | null;
          end_time: string;
          id: string;
          notes: string | null;
          report_id: string | null;
          report_reference: string | null;
          shift_date: string;
          start_time: string;
          status: string;
          updated_at: string;
          visit_status: string | null;
          worker_id: string;
        };
        ComputedFields: never;
        Relationships: [
          {
            foreignKeyName: "care_shifts_client_id_fkey";
            columns: ["client_id"];
            isOneToOne: false;
            referencedRelation: "care_clients";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "care_shifts_worker_id_fkey";
            columns: ["worker_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      cancel_event_registration: {
        Args: { registration_token: string };
        Returns: string;
      };
      care_incident_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          open: number;
          serious_open: number;
        }[];
      };
      care_report_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          monitor: number;
          to_read: number;
          urgent: number;
        }[];
      };
      care_worker_certificates: {
        Args: Record<PropertyKey, never>;
        Returns: {
          completed_on: string;
          course_title: string;
          worker_id: string;
        }[];
      };
      community_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          registrations_upcoming: number;
          upcoming_events: number;
        }[];
      };
      complete_lesson: { Args: { lesson: string }; Returns: string };
      course_outline: {
        Args: { course: string };
        Returns: {
          minutes: number;
          section: string;
          title: string;
        }[];
      };
      course_quiz: {
        Args: { course: string };
        Returns: {
          id: string;
          options: string[];
          question: string;
          sort_order: number;
        }[];
      };
      credential_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          expired: number;
          expiring: number;
          to_check: number;
        }[];
      };
      current_user_has_role: { Args: { role: string }; Returns: boolean };
      drive_connection_clear: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      drive_connection_get: {
        Args: Record<PropertyKey, never>;
        Returns: {
          account_email: string;
          clients_folder_id: string;
          connected_at: string;
          refresh_token_enc: string;
          root_folder_id: string;
          workers_folder_id: string;
        }[];
      };
      drive_connection_save: {
        Args: {
          account_email: string;
          clients_folder_id: string;
          connected_by: string;
          refresh_token_enc: string;
          root_folder_id: string;
          workers_folder_id: string;
        };
        Returns: undefined;
      };
      drive_folder_get: {
        Args: { owner_id: string; owner_kind: string };
        Returns: string;
      };
      drive_folder_save: {
        Args: { folder_id: string; owner_id: string; owner_kind: string };
        Returns: undefined;
      };
      drive_status: {
        Args: Record<PropertyKey, never>;
        Returns: {
          account_email: string;
          connected: boolean;
          connected_at: string;
        }[];
      };
      enquiry_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          status: Database["public"]["Enums"]["enquiry_status"];
          total: number;
        }[];
      };
      ensure_forums: { Args: Record<PropertyKey, never>; Returns: undefined };
      event_places_left: { Args: { event: string }; Returns: number };
      family_message_office: {
        Args: { client: string; message: string };
        Returns: string;
      };
      family_visit_reports: {
        Args: { client: string; max_rows?: number };
        Returns: {
          activities: string[];
          end_time: string;
          id: string;
          meals: string;
          medication: string;
          mood: string;
          reference: string;
          reviewed_at: string;
          start_time: string;
          summary: string;
          tasks_done: string[];
          visit_date: string;
          worker_first_name: string;
        }[];
      };
      family_visits: {
        Args: { client: string; from_date: string; to_date: string };
        Returns: {
          end_time: string;
          id: string;
          shift_date: string;
          start_time: string;
          visit_status: string;
          worker_first_name: string;
        }[];
      };
      find_user_id_by_email: { Args: { lookup: string }; Returns: string };
      has_permission: { Args: { perm: string }; Returns: boolean };
      has_staff_role: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_assigned_to: { Args: { client: string }; Returns: boolean };
      is_care_worker: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_family_member: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_family_of: { Args: { client: string }; Returns: boolean };
      is_learner: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_staff: { Args: Record<PropertyKey, never>; Returns: boolean };
      is_worker_profile: { Args: { uid: string }; Returns: boolean };
      list_care_workers: {
        Args: Record<PropertyKey, never>;
        Returns: {
          email: string;
          full_name: string;
          id: string;
          is_active: boolean;
          last_report_at: string;
          phone: string;
        }[];
      };
      list_family_contacts: {
        Args: { client: string };
        Returns: {
          email: string;
          full_name: string;
          is_active: boolean;
          last_sign_in_at: string;
          link_id: string;
          relationship: string;
          user_id: string;
        }[];
      };
      missed_visit_count: { Args: Record<PropertyKey, never>; Returns: number };
      my_permissions: { Args: Record<PropertyKey, never>; Returns: string[] };
      newsletter_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          pending: number;
          subscribed: number;
          unsubscribed: number;
        }[];
      };
      recruitment_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          n: number;
          stage: string;
        }[];
      };
      recruitment_missing_checks: {
        Args: { applicant: string };
        Returns: string[];
      };
      recruitment_new_applications: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      register_for_event: {
        Args: {
          attend_mode?: string;
          consent_given: boolean;
          email?: string;
          event: string;
          full_name: string;
          needs?: string;
          organisation?: string;
          phone?: string;
          website?: string;
        };
        Returns: string;
      };
      report_stats: {
        Args: { from_date: string; to_date: string };
        Returns: Json;
      };
      search_site: {
        Args: { max_results?: number; query: string };
        Returns: {
          kind: string;
          rank: number;
          summary: string;
          title: string;
          url: string;
        }[];
      };
      self_enrol: { Args: { course: string }; Returns: string };
      set_page_banners: { Args: { banners: Json }; Returns: undefined };
      staff_mfa_required: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      submit_enquiry: {
        Args: {
          consent_given: boolean;
          country?: string;
          email?: string;
          enquiry_type: Database["public"]["Enums"]["enquiry_type"];
          full_name: string;
          message?: string;
          payload?: Json;
          phone?: string;
          source_page?: string;
          subject?: string;
          website?: string;
        };
        Returns: string;
      };
      submit_quiz: {
        Args: { answers: number[]; course: string };
        Returns: {
          certificate_number: string;
          pass_mark: number;
          passed: boolean;
          score: number;
          total: number;
        }[];
      };
      verify_certificate: {
        Args: { code: string };
        Returns: {
          accrediting_body: string;
          certification_type: Database["public"]["Enums"]["certification_type"];
          completed_on: string;
          course_title: string;
          cpd_hours: number;
          learner_name: string;
          number: string;
          revoked: boolean;
        }[];
      };
      wellbeing_counts: {
        Args: Record<PropertyKey, never>;
        Returns: {
          new_requests: number;
          urgent_open: number;
        }[];
      };
    };
    Enums: {
      care_concern: "none" | "monitor" | "urgent";
      care_mood: "great" | "good" | "okay" | "low" | "distressed";
      care_report_status: "submitted" | "reviewed";
      certification_type: "internal" | "cpd" | "externally_accredited";
      content_status: "draft" | "published" | "archived";
      course_audience:
        | "caregivers"
        | "professionals"
        | "parents"
        | "students"
        | "general";
      delivery_mode: "in_person" | "online" | "blended";
      enquiry_status:
        | "new"
        | "in_progress"
        | "contacted"
        | "converted"
        | "closed";
      enquiry_type:
        | "contact"
        | "care_request"
        | "worker_application"
        | "course_registration"
        | "parent_training"
        | "student_programme"
        | "respite"
        | "partnership"
        | "forum_registration";
      partner_type:
        | "healthcare"
        | "laboratory"
        | "insurance"
        | "school"
        | "hospital"
        | "community"
        | "therapist"
        | "training_accreditation"
        | "corporate";
      service_group: "care" | "diaspora" | "respite" | "partnership";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      care_concern: ["none", "monitor", "urgent"],
      care_mood: ["great", "good", "okay", "low", "distressed"],
      care_report_status: ["submitted", "reviewed"],
      certification_type: ["internal", "cpd", "externally_accredited"],
      content_status: ["draft", "published", "archived"],
      course_audience: [
        "caregivers",
        "professionals",
        "parents",
        "students",
        "general",
      ],
      delivery_mode: ["in_person", "online", "blended"],
      enquiry_status: [
        "new",
        "in_progress",
        "contacted",
        "converted",
        "closed",
      ],
      enquiry_type: [
        "contact",
        "care_request",
        "worker_application",
        "course_registration",
        "parent_training",
        "student_programme",
        "respite",
        "partnership",
        "forum_registration",
      ],
      partner_type: [
        "healthcare",
        "laboratory",
        "insurance",
        "school",
        "hospital",
        "community",
        "therapist",
        "training_accreditation",
        "corporate",
      ],
      service_group: ["care", "diaspora", "respite", "partnership"],
    },
  },
} as const;

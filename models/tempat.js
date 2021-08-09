const mongoose = require("mongoose");
const { Schema } = mongoose;

const tempatSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
    lowercase: true,
  },
  jenis: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["maintenancebengkel", "maintenancelab", "maintenancestudio"],
  },
  jumlahTitikPengukuran: {
    ventilasi: {
      type: Number,
      required: true,
      min: 0,
    },
    getaran: {
      type: Number,
      required: true,
      min: 0,
    },
    penerangan: {
      type: Number,
      required: true,
      min: 0,
    },
    kebisingan: {
      type: Number,
      required: true,
      min: 0,
    },
    iklimKerja: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  inspeksi: {
    jumlahPertanyaanApar: {
      type: Number,
      require: true,
      default: 15,
    },
    apar: [
      {
        validasi: {
          kepalaTempat: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          bauk: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          upik3: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        tanggal: {
          type: Date,
          required: true,
          default: Date.now,
        },
        pekerja: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        perkerjaan: {
          type: String,
          required: true,
          default: "apar",
        },
        pertanyaan1: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan2: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan3: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan4: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan5: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan6: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan7: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan8: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan9: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan10: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan11: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan12: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan13: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan14: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan15: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
      },
    ],
    hydrant: [
      {
        validasi: {
          kepalaTempat: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          bauk: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          upik3: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        tanggal: {
          type: Date,
          required: true,
          default: Date.now,
        },
        pekerja: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        perkerjaan: {
          type: String,
          required: true,
          default: "hydrant",
        },
        pertanyaan1: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan2: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan3: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan4: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan5: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan6: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan7: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan8: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan9: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan10: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan11: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan12: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan13: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan14: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan15: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan16: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan17: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan18: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan19: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan20: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan21: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan22: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan23: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan24: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan25: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan26: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
      },
    ],
    apd: [
      {
        validasi: {
          kepalaTempat: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          bauk: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          upik3: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        tanggal: {
          type: Date,
          required: true,
          default: Date.now,
        },
        pekerja: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        perkerjaan: {
          type: String,
          required: true,
          default: "apd",
        },
        pertanyaan1: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan2: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan3: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan4: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan5: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan6: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan7: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan8: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan9: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan10: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan11: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan12: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan13: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan14: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan15: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan16: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan17: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
      },
    ],
    housekeeping: [
      {
        validasi: {
          kepalaTempat: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          bauk: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
          upik3: {
            user: {
              type: Schema.Types.ObjectId,
              ref: "User",
              default: null,
            },
            status: {
              type: Boolean,
              required: true,
              default: false,
            },
          },
        },
        tanggal: {
          type: Date,
          required: true,
          default: Date.now,
        },
        pekerja: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        perkerjaan: {
          type: String,
          required: true,
          default: "housekeeping",
        },
        pertanyaan1: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan2: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan3: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan4: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan5: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan6: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan7: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan8: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan9: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan10: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan11: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan12: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan13: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan14: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },

        pertanyaan15: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan16: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan17: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan18: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
        pertanyaan19: {
          status: {
            type: Boolean,
            required: true,
            default: null,
          },
          keterangan: {
            type: String,
            required: true,
            default: null,
          },
        },
      },
    ],
  },
});

module.exports = mongoose.model("Tempat", tempatSchema);
